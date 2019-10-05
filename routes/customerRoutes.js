var express = require("express"),
    router  = express.Router(),
    Product = require("../models/product"),
    Cart    = require("../models/cart"),
    Store   = require("../models/store"),
    Order   = require("../models/order"),
    Deliveryman   = require("../models/deliveryman"),
    distance = require('google-distance-matrix'),
    deasync = require('deasync'),
    middleware = require("../middleware");

// ====================================
//  Google-distance-matrix's API key.
// ====================================
distance.key('YOUR API KEY');

// ========================================================================================
//  Customer's history GET request w/ middleware checking if there is a logged in user.
// ========================================================================================
router.get("/history", middleware.isLoggedIn, (req, res) => {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        if (typeof req.session.cart === 'undefined' || !req.session.cart) {
            res.render("history", { orders: orders, cartItems: null });
        }else{
            cart = new Cart(req.session.cart);
            res.render("history", { orders: orders, cartItems: cart.generateArray() });
        }
    });
});

// ===================================
//  Customer's checkout GET request .
// ===================================
router.get("/cart/checkout", middleware.isLoggedIn, (req, res) => {
    if (typeof req.session.cart === 'undefined' || !req.session.cart) {
        res.render("checkout", { cartItems: null });
    }else{
        var cart = new Cart(req.session.cart);
        res.render("checkout", { cartItems: cart.generateArray() });
    }
});

// ============================================================
//  Customer's checkout POST request and order creation in DB.
// ============================================================
router.post("/checkout", middleware.isLoggedIn, (req, res) => {
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    var storeassigned = storeAssign(req.body.latitude, req.body.longitude, cart.generateArray());
    if(storeassigned) { var deliveryassigned = deliveryAssign(storeassigned, cart.generateArray()); }
    if(storeassigned && deliveryassigned && cart) //if store has been assigned to that order, delivery man, and cart is not null then create the order.
        {
            var newOrder = new Order({user: req.user, phoneNumber: req.user.phoneNumber, cart: req.session.cart, firstName: req.body.firstName, lastName: req.body.lastName, address: req.body.address, timestamp: Date.now(),"location.lat": req.body.latitude, "location.lng": req.body.longitude, delivered: false, store: storeassigned, deliveryman: deliveryassigned });
            newOrder.save((err, order) => {
                if(err){
                     console.log(err);
                 }else{
                     req.session.cart = null;
                     res.render("orderPlaced");
                 }
            });
            console.log('Order completed from ' + storeassigned.store.name, storeassigned.dist, "w/", deliveryassigned.user.username + " " + deliveryassigned.dist + "!");
        }else {
            console.log('Can not assign right now! :(');
            res.render("orderNotPlaced", { cartItems: cart.generateArray() });
        }
});

// =======================================
// Product addition to cart GET request.
// =======================================
router.get("/cart/add/:id/:qty/:fromCart", (req, res) => {
    var productId = req.params.id;
    var fromCart = req.params.fromCart;
    var qty = req.params.qty;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById({ _id: productId }, (err, product) => {
        if(err) {
            console.log(err);
            //req.flash("error", "Το προϊόν δεν προστέθηκε στο καλάθι.");
            res.redirect('back');
        }
        cart.add(product, product._id, qty);
        req.session.cart = cart;
        //req.flash("success", "Το προϊόν προστέθηκε στο καλάθι επιτυχώς!");
        console.log('Product added to Cart!');
        if(fromCart === 'true'){
            res.redirect(req.get('referer') + '#kalathi');
        } else {
            res.redirect("back");
        }
    });
});

// ========================================
// Product reduction from cart GET request.
// ========================================
router.get('/cart/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById({ _id: productId }, (err, product) => {
        if(err) {
            console.log(err);
            //req.flash("error", "Το προϊόν δεν αφαιρέθηκε απο το καλάθι.");
            res.redirect('back');
        }
        cart.reduce(productId);
        req.session.cart = cart;
        //req.flash("success", "Το προϊόν αφαιρέθηκε απο το καλάθι επιτυχώς!");
        console.log('Product reduced from Cart!');
        res.redirect(req.get('referer') + '#kalathi');
    });
});

// =======================================
// Product removed from cart GET request.
// =======================================
router.get('/cart/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById({ _id: productId }, (err, product) => {
        if(err) {
            console.log(err);
            //req.flash("error", "Το προϊόν δεν αφαιρέθηκε απο το καλάθι.");
            res.redirect('back');
        }
        cart.removeItem(productId);
        req.session.cart = cart;
        //req.flash("success", "Το προϊόν αφαιρέθηκε απο το καλάθι επιτυχώς!");
        console.log('Product removed from Cart!');
        res.redirect(req.get('referer') + '#kalathi');
    });
});

// ============================
// Product info GET request.
// ============================
router.get("/getProduct/:id", (req, res) => {
    Product.findById({ _id: req.params.id }, (err, product) => {
        if(err) {
            console.log(err);
        } else {
            res.send(product);
        }
    });
});



function deliveryAssign(storeinfo, cart){
    var sync = true;
    var delivery = null;
    Store.findOne({name: storeinfo.store.name}, function(err, store) {
        if(err) {
                console.log(err);
            } else {
                delivery = deliveryBug(store, cart);
                sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return delivery;
}

function calculateDistance(originLat, originLng, destinationLat, destinationLng){
    var origin = [originLat + ',' + originLng];
    var destination = [destinationLat + ',' + destinationLng];
    var sync = true;
    var data = null;
    distance.matrix(origin, destination, function (err, distances) {
        if(err) { return false; }
        else{
            data = distances.rows[0].elements[0].distance.value;
            sync = false;
        }
    });
    while(sync) {deasync.sleep(100);}
    return data;
}

// ====================================================================
// Calculate the distance from all the available delivery mans and
// decrease the qty of the store products that the customer bought.
// ====================================================================
function deliveryBug(store, cart){
    var sync = true;
    var deliverybug = null;
    Deliveryman.find({"available": true}, function(err, man) {
                   if(err) {
                        console.log(err);
                    } else {
                        if(man.length){
                            var min = calculateDistance(man[0].location.lat, man[0].location.lng, store.location.lat, store.location.lng);
                            var loc = 0;
                            for(var i = 0; i < man.length; i++){
                                var tempdist = calculateDistance(man[i].location.lat, man[i].location.lng, store.location.lat, store.location.lng);
                                if ( tempdist < min )
                                {
                                    min = tempdist;
                                    loc = i;
                                }
                            }
                            //UPDATE QTYS
                            Store.findOne({name: store.name}, function(err, store) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    for(var j = 0; j < cart.length; j++){
                                        for(var k = 0; k < store.product.length; k++){
                                            if(store.product[k].name === cart[j].item.name){
                                                Store.update({ "_id" : store._id, "product.name": store.product[k].name  }, { $inc: { "product.$.quantity": -cart[j].qty}}, function(err){ //update the store products qty
                                                    if(err){
                                                        console.log(err);
                                                    }else{
                                                        console.log("Successfully modified product's store qty after purchase!");
                                                    }
                                                });
                                            }
                                        }
                                    }

                                }
                            });
                            deliverybug = { user: man[loc], dist: min };
                            sync = false;
                        } else {
                            console.log('Hire new delivery men! They are not available right now!');
                            deliverybug = null;
                            sync = false;
                        }
                }
    });
    while(sync) {deasync.sleep(100);}
    return deliverybug;
}

// =======================================================================
// Assign to the order the store with the min distance from the customer.
// =======================================================================
function storeAssign(lat, lng, cart){
    var sync = true;
    var store = null;
    Store.find({}, function(err, stores) {
        if(err) {
            console.log(err);
        } else {
            var tempStores = [];
            for(var i = 0; i < stores.length; i++){
                tempStores.push({store: stores[i], dist: calculateDistance(stores[i].location.lat, stores[i].location.lng, lat, lng)});
            }
            tempStores.sort(function(a,b) {return (a.dist > b.dist) ? 1 : ((b.dist > a.dist) ? -1 : 0);} );

            var servicestoreflag = null;

            var serviceflag = null;
            for(var i = 0; i < stores.length; i++){
                serviceflag = findStore(i, tempStores[i].store.name, cart);
                if(serviceflag == true) {
                    servicestoreflag = i;
                    break;
                }
            }
            if(serviceflag == false)
                {
                  store = null;
                  sync = false;
                }
            else {
                    store = tempStores[servicestoreflag];
                    sync = false;
                }
        }
    });
    while(sync) {deasync.sleep(100);}
    return store;
}

// ============================================
// Find the store with the requested products.
// ============================================
function findStore(i, storename, cart){
    var sync = true;
    var serviceflag = null;
    Store.findOne({name: storename}, function(err, store) {
                    if(err) {
                        console.log(err);
                    } else {
                        serviceflag = storeBug(store, cart);
                        sync = false;
                    }
                });
    while(sync) {require('deasync').sleep(100);}
    return serviceflag;
}

// ==============================================================
// Check if the store has the sufficient number of products qty.
// ==============================================================
function storeBug(store, cart){
    var serviceflag = true;
    for(var j = 0; j < cart.length; j++){
        for(var k = 0; k < store.product.length; k++)
        {
            if((store.product[k].name == cart[j].item.name) && (store.product[k].quantity < cart[j].qty))
            {
                serviceflag = false;
                break;
            }
        }
            if(serviceflag == false) break;
        }
    return serviceflag;
}

module.exports = router;
