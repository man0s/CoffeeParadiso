var express = require("express"),
    router  = express.Router(),
    Cart    = require("../models/cart"),
    Store   = require("../models/store"),
    Order   = require("../models/order"),
    middleware = require("../middleware");

// ===================================================================================
// Manager's panel GET request w/ middleware checking if the current user is manager.
// ===================================================================================
router.get("/manager", middleware.isManager, (req, res) => {
    Store.findOne({ "manager.username": req.user.username }, function(err, foundStore){
        if(err){
            console.log(err);
        }
        else{
            if (typeof req.session.cart === 'undefined' || !req.session.cart) {
                res.render("manager", { store: foundStore, cartItems: null });
            }else{
                var cart = new Cart(req.session.cart);
                res.render("manager", { store: foundStore, cartItems: cart.generateArray() });
            }
        }
    });
});

// =======================================================
//  Manager's GET request for getting info of all orders.
// =======================================================
router.get("/manager/getOrders", middleware.isManager, (req, res) => {
    Store.findOne({ "manager.username": req.user.username }, function(err, foundStore){
        if(err){
            console.log(err);
        } else {
                Order.find({ "store.store._id": foundStore._id, "delivered": false }, function(err, orders){
                    if(err){
                        console.log(err);
                    } else {
                        res.send(orders);
                    }
                });
            }
        });
});

// =======================================================
//  Manager's POST request for updating qty of a product.
// =======================================================
router.post("/manager/updateqty", middleware.isManager, (req, res) => {
    Store.findOne({ "manager.username": req.user.username }, function(err, foundStore){
        if(err){
            console.log(err);
        }else{
            Store.update({ "_id" : foundStore._id, "product.name": req.body.name  }, { $set: { "product.$.quantity": req.body.quantity}}, function(err){
                                if(err){
                                    console.log(err);
                                    req.flash("error", "Η ποσότητα του προϊόντος δεν ενημερώθηκε.");
                                    res.redirect('back');
                                }else{
                                    console.log("Successfully updated product's qty!");
                                    req.flash("success", "Η ποσότητα του προϊόντος ενημερώθηκε επιτυχώς!");
                                    res.redirect('/manager#apothema');
                                }
                            });
        }
    });
});

// ===================================================
//  Manager's GET request for getting personal info.
// ===================================================
router.get("/manager/getInfo", middleware.isManager, (req, res) => {
    Store.findOne({"manager.username": req.user.username}, function(err, store) {
        if(err) {
                console.log(err);
                res.send(null);
            } else {
                Order.find({ "store.store.name": store.name }, function(err, orders) {
                    if (err) {
                        console.log(err);
                    } else {
                        var date = new Date;
                        var data = {};
                        data.revenue = 0;
                        data.salary = 800;
                        orders.forEach(function(order) {
                            if((date.getUTCFullYear(orders.timestamp) == date.getUTCFullYear()) && (date.getUTCMonth(orders.timestamp) == date.getUTCMonth())){
                                data.revenue += parseFloat(order.cart.totalPrice);
                            }
                        });
                        data.salary += (data.revenue * 0.02);
                        res.send(data);
                    }
                });
        }
    });
});

module.exports = router;