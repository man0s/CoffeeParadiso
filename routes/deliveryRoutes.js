var express = require("express"),
    router  = express.Router(),
    Cart    = require("../models/cart"),
    Order   = require("../models/order"),
    Deliveryman   = require("../models/deliveryman"),
    middleware = require("../middleware");

// ==============================================================================================
//  Delivery man's panel GET request w/ middleware checking if the current user is delivery man.
// ==============================================================================================
router.get("/deliveryman", middleware.isDelivery, (req, res) => {
    Deliveryman.findOne({ "username": req.user.username }, function(err, foundMan){
        if(err){
            console.log(err);
        }
        else{
            if (typeof req.session.cart === 'undefined' || !req.session.cart) {
                res.render("deliveryman", { deliveryman: foundMan, cartItems: null });
            }else{
                var cart = new Cart(req.session.cart);
                res.render("deliveryman", { deliveryman: foundMan, cartItems: cart.generateArray() });
            }
        }
    });
});

// =================================================
//  Delivery man's GET request to get order's info.
// =================================================
router.get("/deliveryman/getOrder", middleware.isDelivery, (req, res) => {
    Deliveryman.findOne({ "username": req.user.username}, function(err, man){
        if(err){
            console.log(err);
        } else {
                if(man){
                    Order.findOne({ "deliveryman.user._id": man._id, "delivered": false }, function(err, order){
                        if(err){
                            console.log(err);
                        } else {
                            if(order){
                                Deliveryman.update({"username": req.user.username}, { $set: {"available": false, "location.lat": order.location.lat, "location.lng": order.location.lng}}, function(err){ //update the deliveryman's location with the order location
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log("Successfully updated deliveryman's available state and coord");
                                    }
                                });
                                res.send(order);
                            } else { res.send(null); }
                        }
                    });
                } else { res.send(null); }
        }
    });
});

// ==================================================
//  Delivery man's GET request to get personal info.
// ==================================================
router.get("/deliveryman/getInfo", middleware.isDelivery, (req, res) => {
    Deliveryman.findOne({"username": req.user.username}, function(err, man) {
        if(err) {
            console.log(err);
            res.send(null);
        } else {
            var date = new Date;
            var data = {};
            data.hours = 0;
            data.dist = 0;
            data.salary = 0;
            data.deliveries = 0;
            man.hours.forEach(function(shift) {
                if((date.getUTCFullYear(shift.start) == date.getUTCFullYear()) && (date.getUTCMonth(shift.start) == date.getUTCMonth()) && (date.getUTCDay(shift.start) == date.getUTCDay())){
                    if(shift.end) data.hours += ((shift.end - shift.start)/1000/60/60); //calculate working hours by sub start and end timestamp and converting them to hours w/ /1000/60/60
                    else { data.hours += ((Date.now() - shift.start)/1000/60/60); }
                    data.deliveries += shift.deliveries;
                }
            });
            data.dist = getDistInfo(req.user.username)/1000; //get distance in meters and convert them to km
            data.salary = (data.hours * 5) + (data.dist * 0.10);
            res.send(data);
        }
    });
});

// ==========================================================
//  Delivery man's post request in order to start the shift.
// ==========================================================
router.post("/deliveryman/shift", middleware.isDelivery, (req, res) => {
    if(req.body.active == "true") {
        Deliveryman.update({ "username" : req.user.username}, { $set: { "location.lat": req.body.latitude, "location.lng": req.body.longitude, "active": true, "available": true }, $push: { "hours": { "start": Date.now(), "end": 0, "deliveries": 0 }}}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Successfully updated deliveryman's coords!");
            }
        });
    } else {
        Deliveryman.findOne({ "username": req.user.username}, function(err, man) {
            if (err) {
                console.log(err);
            } else {
                var index = man.hours.length - 1;
                var s3t = {};
                s3t['hours.' + index + '.end'] = Date.now();
                Deliveryman.update({ "username" : req.user.username}, { $set: s3t }, function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully updated deliveryman's end timestamp!");
                    }
                });

                Deliveryman.update({ "username" : req.user.username}, { $set: { "active": false, "available": false }}, function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Successfully updated deliveryman's active state!");
                    }
                });
            }
        });
    }
	res.redirect("/deliveryman");
});

// ==========================================================
//  Delivery man's post request in order to end the shift.
// ==========================================================
router.post("/deliveryman/success", middleware.isDelivery, (req, res) => {
    Deliveryman.findOne({ "username": req.user.username}, function(err, man) {
    if (err) {
        console.log(err);
    } else {
            var index = man.hours.length - 1;
            var iNc = {};
            iNc['hours.' + index + '.deliveries'] = 1;
            Deliveryman.update({"username": req.user.username}, {$inc: iNc}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully increased deliveryman's deliveries!");
                }
            });
            }
    });
        Deliveryman.update({"username": req.user.username}, { $set: {"available": true} }, function(err){
            if(err){
                console.log(err);
            }else{
                Order.update({ "deliveryman.user.username": req.user.username, "delivered": false }, { $set: { "delivered": true } }, function(err, order){
                    if(err){
                            console.log(err);
                    } else {
                            console.log("Successfully updated order's delivered state!");
                    }
                });
                console.log("Successfully updated deliveryman's available state!");
            }
        });
    res.redirect("/deliveryman");
});

// ===========================================================================
//  Function that calculates for a given delivery man the distance in meters.
// ===========================================================================
function getDistInfo(username){
    var sync = true;
    var dist = null;
    Order.find({ "deliveryman.user.username": username }, function(err, orders) {
        if (err) {
            console.log(err);
        } else {
            var date = new Date;
            var tempdist = 0;
            orders.forEach(function(order) {
                if((date.getUTCFullYear(order.timestamp) == date.getUTCFullYear()) && (date.getUTCMonth(order.timestamp) == date.getUTCMonth()) && (date.getUTCDay(order.timestamp) == date.getUTCDay())){
                    //tempdist += (order.deliveryman.dist + order.store.dist);
                    tempdist += order.store.dist;
                }
            });
            dist = tempdist;
            sync = false;
        }
    });
    while(sync) {require('deasync').sleep(100);}
    return dist;
}

module.exports = router;