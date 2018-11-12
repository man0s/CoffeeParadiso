var express     = require("express"),
    router      = express.Router(),
    Product     = require("../models/product"),
    Cart        = require("../models/cart"),
    Store       = require("../models/store"),
    Order       = require("../models/order"),
    Deliveryman = require("../models/deliveryman"),
    deasync     = require('deasync'),
    middleware  = require("../middleware"),
    User        = require("../models/user");

// ========================================================================================
//  Admin's panel GET request w/ middleware checking if the current user is administrator.
// ========================================================================================
router.get("/admin", middleware.isAdmin, (req, res) => {
    if (typeof req.session.cart === 'undefined' || !req.session.cart) {
            res.render("admin", { cartItems: null });
        }else{
            var cart = new Cart(req.session.cart);
            res.render("admin", { cartItems: cart.generateArray() });
        }
});


// =====================================================================================
//  Admin's POST request for adding a new store w/ manager in the DB.
// =====================================================================================
router.post("/admin/addstore", middleware.isAdmin, (req, res) => {
    var newUser = new User({username: req.body.username, phoneNumber: req.body.telephone, type: "manager"});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", "Αυτό το email χρησιμοποιείται ήδη.");
            res.redirect("back");
        }else{
                var newStore = new Store({name: req.body.name, address: req.body.address, phoneNumber: req.body.telephone,
                            location: {
                                lat: req.body.latitude,
                                lng: req.body.longitude},
                            manager: {
                                username: req.body.username,
                                password: req.body.password,
                                name: req.body.firstName,
                                surname: req.body.lastName,
                                AFM: req.body.afm,
                                AMKA: req.body.amka,
                                IBAN: req.body.iban},
                                product: []
                            });
                            newStore.save((err, tempstore) => {
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Προστέθηκε νέο κατάστημα και υπεύθυνος επιτυχώς!");
                                Product.find({}, function(err, products) {
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            products.forEach((product) => { //Get the products of found Store and copy them to the new store with 0 qty
                                                Store.update({ "name" : tempstore.name }, { $push: { "product": {name: product.name, quantity: "0"}}}, {upsert:true}, function(err){
                                                              if(err){
                                                                    console.log(err);
                                                              }else{
                                                                    console.log("Προστέθηκε προϊόν στο νέο κατάστημα επιτυχώς!");
                                                              }
                                                });
                                            });
                                            req.flash("success", "Προστέθηκε νέο κατάστημα και υπεύθυνος επιτυχώς!");
                                            res.redirect('back');
                                        }
                                        });
                }
        });
    }
    });
});

// =====================================================================================
//  Admin's POST request for adding a new product in the DB and the store.
// =====================================================================================
router.post("/admin/addproduct", middleware.isAdmin, (req, res) => {
    var newProduct = new Product({name: req.body.name, type: req.body.type, price: req.body.price, image: req.body.image, desc: req.body.desc});
    newProduct.save((err, product) => {
    if(err){
        console.log(err);
    }else{
        console.log("Successfuly added a new product!");
        req.flash("success", "Προστέθηκε νέο προϊόν επιτυχώς!");
        if(req.body.type === "food") {
            Store.find({}, function (err, stores) {
            if(err) {
                console.log(err);
            } else {
                stores.forEach((store) => { //Update all stores with the new product addition
                    Store.update({ "_id" : store._id }, { $push: { "product": {name: req.body.name, quantity: "0"}}}, {upsert:true}, function(err){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("Successfuly added the new product in all stores!");
                            }
                        });
                    });
                }
            });
        }
        res.redirect("back");
    }
    });
});

// =====================================================================================
//  Admin's POST request for adding a new delivery man in the DB.
// =====================================================================================
router.post("/admin/adddelivery", middleware.isAdmin, (req, res) => {
    var newUser = new User({username: req.body.username, phoneNumber: "000", type: "deliveryman"});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            req.flash("error", "Αυτό το email χρησιμοποιείται ήδη.");
            res.redirect("back");
        }else{
            var newDeliveryman = new Deliveryman({
            username: req.body.username,
            password: req.body.password,
            name: req.body.firstName,
            surname: req.body.lastName,
            AFM: req.body.afm,
            AMKA: req.body.amka,
            IBAN: req.body.iban});
            newDeliveryman.save((err, man) => {
            if(err){
                console.log(err);
            }else{
                console.log("Successfulyly added a new deliveryman!");
                req.flash("success", "Προστέθηκε νέος διανομέας επιτυχώς!");
                res.redirect('back');
            }
            });
        }
    });
});

// =====================================================================================
//  Admin's GET request for downloading the XML file for the given month and year.
// =====================================================================================
router.get("/admin/getXML/:month/:year/", middleware.isAdmin, (req, res) => {
    console.log("Generating XML..");
    var header = '<xml>\n\t<header>\n\t\t<transaction>\n\t\t\t<period month="' + req.params.month +'" year="' + req.params.year + '"/>\n\t\t</transaction>\n\t</header>\n\t<body>\n\t\t<employees>';
    var managers = "";
    var delivery = "";
    var managersarr = XMLdizManagers(req.params.month, req.params.year);
    var deliveryarr = XMLdizDeliverys(req.params.month, req.params.year);
    for(var i = 0; i < managersarr.length; i++){
        managers += '\n\t\t\t<employee>\n\t\t\t\t<firstName>' + managersarr[i].name + '</firstName>\n\t\t\t\t<lastName>' + managersarr[i].surname + '</lastName>\n\t\t\t\t<amka>' + managersarr[i].amka + '</amka>\n\t\t\t\t<afm>' + managersarr[i].afm + '</afm>\n\t\t\t\t<iban>' + managersarr[i].iban + '</iban>\n\t\t\t\t<ammount>' + managersarr[i].ammount.toFixed(2) + '</ammount>\n\t\t\t</employee>';
    }
    for(var i = 0; i < deliveryarr.length; i++){
        delivery += '\n\t\t\t<employee>\n\t\t\t\t<firstName>' + deliveryarr[i].name + '</firstName>\n\t\t\t\t<lastName>' + deliveryarr[i].surname + '</lastName>\n\t\t\t\t<amka>' + deliveryarr[i].amka + '</amka>\n\t\t\t\t<afm>' + deliveryarr[i].afm + '</afm>\n\t\t\t\t<iban>' + deliveryarr[i].iban + '</iban>\n\t\t\t\t<ammount>' + deliveryarr[i].ammount.toFixed(2) + '</ammount>\n\t\t\t</employee>';
    }
    var footer = '\n\t\t</employees>\n\t</body>\n</xml>';

    res.setHeader('Content-disposition', 'attachment; filename=payment.xml');
    res.setHeader('Content-type', 'text/xml');
    res.charset = 'UTF-8';
    res.write(header + managers + delivery + footer);
    res.end();
    console.log("XML has been generated!");
});

// =======================================
//  Make the array of all manager's info.
// =======================================
function XMLdizManagers(month, year){
    var sync = true;
    var employees = null;
    Store.find({}, function(err, stores) {
        if(err) {
            console.log(err);
        } else {
            var data = [];
            stores.forEach(function(store, i) {
                data[i] = XMLdatManager(store.manager.username, month, year);
            });
            employees = data;
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return employees;
}

// =====================================================================================
//  Find the store of the current's searched manager and make the data object.
// =====================================================================================
function XMLdatManager(username, month, year){
    var sync = true;
    var data = {};

    Store.findOne({"manager.username": username}, function(err, store) {
        if(err) {
            console.log(err);
        } else {
            data.name = store.manager.name;
            data.surname = store.manager.surname;
            data.amka = store.manager.AMKA;
            data.afm = store.manager.AFM;
            data.iban = store.manager.IBAN;
            data.ammount = SYNCdatManager(store.name, month, year);
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return data;
}

// ===================================================================================================
//  Find the current store's salary and revenue by combining all order's of the given month and year.
// ===================================================================================================
function SYNCdatManager(store, month, year){
    var sync = true;
    var salary = 0;
    Order.find({ "store.store.name": store }, function(err, orders) {
        if (err) {
            console.log(err);
        } else {
            var date = new Date;
            var data = {};
            var revenue = 0;
            orders.forEach(function(order) {
                if((date.getUTCFullYear(orders.timestamp) == year) && (date.getUTCMonth(orders.timestamp) == (month - 1))){
                    revenue += parseFloat(order.cart.totalPrice);
                }
            });
            if((date.getUTCFullYear(orders.timestamp) == year) && (date.getUTCMonth(orders.timestamp) == (month - 1))) {
                salary = 800 + (revenue * 0.02);
            }
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return salary;
}

function XMLdizDeliverys(month, year){
    var sync = true;
    var employees = null;
    Deliveryman.find({}, function(err, man) {
        if(err) {
            console.log(err);
        } else {
            var data = [];
            man.forEach(function(man, i) {
                data[i] = XMLdatDelivery(man.username, month, year);
            });
            employees = data;
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return employees;
}


// =================================================================================================================
//  Find the current delivery man's ammount by calculating the distance km's and the hour difference between the
//  start of his shift's timestamp and the end's timestamp.
// =================================================================================================================
function XMLdatDelivery(username, month, year){
    var sync = true;
    var data = {};
    Deliveryman.findOne({"username": username}, function(err, man) {
        if(err) {
            console.log(err);
            return null;
        } else {
            var date = new Date;
            data.hours = 0;
            data.dist = 0;
            data.ammount = 0;
            man.hours.forEach(function(shift) {
                if((date.getUTCFullYear(shift.start) == year) && (date.getUTCMonth(shift.start) == (month - 1))){
                    if(shift.end) data.hours += ((shift.end - shift.start)/1000/60/60);
                }
            });
            data.name = man.name;
            data.surname = man.surname;
            data.amka = man.AMKA;
            data.afm = man.AFM;
            data.iban = man.IBAN;
            data.dist = getDistDelInfo(username, month, year)/1000;
            data.ammount = (data.hours * 5) + (data.dist * 0.10);
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return data;
}

// =====================================================================================================
//  Find the current delivery man's distance calculate the distance between the store and the customer.
// =====================================================================================================
function getDistDelInfo(username, month, year){
    var sync = true;
    var dist = 0;
    Order.find({ "deliveryman.user.username": username }, function(err, orders) {
        if (err) {
            console.log(err);
        } else {
            var date = new Date;
            var tempdist = 0;
            orders.forEach(function(order) {
                if((date.getUTCFullYear(order.timestamp) == year) && (date.getUTCMonth(order.timestamp) == (month - 1))){
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