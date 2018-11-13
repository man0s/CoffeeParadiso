// ===========
//   Setup
// ===========
var express               = require("express"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    session               = require("express-session"),
    MongoStore            = require("connect-mongo")(session),
    logger                = require("morgan"),
    flash                 = require("connect-flash"),
    User                  = require("./models/user"),
    seedDB                = require("./seed");

// ================
//   Routes Setup
// ================
var indexRoutes    = require("./routes/indexRoutes"),
    customerRoutes = require("./routes/customerRoutes"),
    deliveryRoutes = require("./routes/deliveryRoutes"),
    managerRoutes  = require("./routes/managerRoutes"),
    adminRoutes    = require("./routes/adminRoutes");


// ===========
//   MongoDB
// ===========
mongoose.connect("MONGO DB URI", { useMongoClient: true });
mongoose.Promise = global.Promise;

// seedDB(); //seed the db


// ================
//  Express Setup
// ================
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(logger('dev'));
var debug = require('debug')('untitled:server');

// ================
//  Passport Setup
// ================
app.use(session({
    secret: "46$g*VvR#*mbF*EI7&9Fw8Db$*E24C%7",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } //3 hours
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
//   Globals
// ===========
app.use(function(req, res, next){
   res.locals.currentUser = req.user;             //make currentUser available in all the views
   res.locals.session     = req.session;          //make session available in all the views
   res.locals.ref_path    = req.url;              //make ref_path available in all the views
   res.locals.success     = req.flash('success'); //make success available in all the views
   res.locals.error       = req.flash('error');   //make error available in all the views
   next();
});

// ===========
//   Routes
// ===========
//index routes
app.get("/", indexRoutes);
app.get("/menu", indexRoutes);
app.get("/stores", indexRoutes);
app.get("/getStore/:id", indexRoutes);
app.get("/getStoreLocations", indexRoutes);
app.post("/register", indexRoutes);
app.post("/login", indexRoutes);
app.get("/logout", indexRoutes);
app.get("/getStoresNumber", indexRoutes);
//customer routes
app.get("/history", customerRoutes);
app.get("/cart/checkout", customerRoutes);
app.post("/checkout", customerRoutes);
app.get("/cart/add/:id/:qty/:fromCart", customerRoutes);
app.get('/cart/reduce/:id', customerRoutes);
app.get('/cart/remove/:id', customerRoutes);
app.get("/getProduct/:id", customerRoutes);
//manager routes
app.get("/manager", managerRoutes);
app.get("/manager/getOrders", managerRoutes);
app.post("/manager/updateqty", managerRoutes);
app.get("/manager/getInfo", managerRoutes);
//delivery routes
app.get("/deliveryman", deliveryRoutes);
app.get("/deliveryman/getOrder", deliveryRoutes);
app.get("/deliveryman/getInfo", deliveryRoutes);
app.post("/deliveryman/shift", deliveryRoutes);
app.post("/deliveryman/success", deliveryRoutes);
//admin routes
app.get("/admin", adminRoutes);
app.post("/admin/addstore", adminRoutes);
app.post("/admin/addproduct", adminRoutes);
app.post("/admin/adddelivery", adminRoutes);
app.get("/admin/getXML/:month/:year/", adminRoutes);
//error routes
app.get("/*", indexRoutes);


app.listen(3000, () => {
   console.log("Delivering at http://localhost/");
});
