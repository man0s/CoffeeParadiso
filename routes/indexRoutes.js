var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    Product  = require("../models/product"),
    User     = require("../models/user"),
    Cart     = require("../models/cart"),
    Store    = require("../models/store");

// ==========================================
// GET request for rendering the index page.
// ==========================================
router.get("/", (req, res) => {
    if (typeof req.session.cart === 'undefined' || !req.session.cart) {
        res.render("index", { cartItems: null });
    }else{
        var cart = new Cart(req.session.cart);
        res.render("index", { cartItems: cart.generateArray() });
    }
});

// ==========================================
// GET request for rendering the menu page.
// ==========================================
router.get("/menu", (req, res) => {
    Product.find({}, (err, products) => {
        if(err) {
            console.log(err);
        }else {
            if (typeof req.session.cart === 'undefined' || !req.session.cart) {
                res.render("menu", { products: products, cartItems: null });
            }else{
                var cart = new Cart(req.session.cart);
                res.render("menu", { products: products, cartItems: cart.generateArray() });
            }
        }
    });
});

// ==========================================
// GET request for rendering the stores page.
// ==========================================
router.get("/stores", (req, res) => {
    Store.find({}, (err, stores) => {
        if(err) {
            console.log(err);
        }else {
            if (typeof req.session.cart === 'undefined' || !req.session.cart) {
                res.render("stores", { stores: stores, cartItems: null });
            }else{
                var cart = new Cart(req.session.cart);
                res.render("stores", { stores: stores, cartItems: cart.generateArray() });
            }
        }
    });
});

// ==========================================
// GET request for getting info for a store.
// ==========================================
router.get("/getStore/:id", (req, res) => {
    Store.find({ _id: req.params.id }, (err, stores) => {
        if (err) {
            console.log(err);
        } else {
            res.send(stores);
        }
    });
});

// ====================================================
// GET request for getting the location of the stores.
// ====================================================
router.get("/getStoreLocations", (req, res) => {
    Store.find({}, (err, stores) => {
        if (err) {
            console.log(err);
        } else {
            var markers = [];
            stores.forEach((store) => {
               markers.push(store.location);
            });
            res.send(markers);
        }
    });
});

// ==============================================
// POST request for registering a new customer.
// ==============================================
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username, phoneNumber: req.body.phoneNumber, type: 'customer'});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", "Αυτό το email χρησιμοποιείται ήδη.");
            res.redirect("back");
        }else{
            passport.authenticate("local")(req, res, () => {
                    req.flash("success", "Καλωσόρίσατε " + req.user.username.match(/^([^@]*)@/)[1] + "!");
                    res.redirect(req.body.ref_path);
            });
        }
    });
});

// ===============================
// POST request for login a user.
// ===============================
router.post("/login", passport.authenticate("local", {
    failureFlash: 'Το email ή ο κωδικός πρόσβασης σας δεν είναι έγκυρος.',
    failureRedirect: "/"
}) ,(req, res) => {
    req.flash("success", "Καλωσορίσατε " + req.user.username.match(/^([^@]*)@/)[1] + "!");
    res.redirect(req.body.ref_path);
});

// ====================================
// GET request for logging out a user.
// ====================================
router.get("/logout",(req, res) => {
    var type = req.user.type;
    req.logout();
    req.flash("success", "Αποσυνδεθήκατε επιτυχώς!");
    if( type === 'customer') { res.redirect('back'); }
    else { res.redirect('/'); }
});

// ===========================================
// GET request for gettind the stores number.
// ===========================================
router.get("/getStoresNumber", (req, res) => {
    Store.find({}, function(err, stores) {
        if(err) {
            console.log(err);
            res.send(null);
        } else {
            var data = {};
            data.number = stores.length;
            res.send(data);
        }
    });
});

// ================================
// GET request for 404 error page.
// ================================
router.get("/*", (req, res) => {
    if (typeof req.session.cart === 'undefined' || !req.session.cart) {
        res.render("404", { cartItems: null });
    }else{
        var cart = new Cart(req.session.cart);
        res.render("404", { cartItems: cart.generateArray() });
    }
});

module.exports = router;