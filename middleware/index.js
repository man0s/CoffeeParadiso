var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Παρακαλώ συνδεθείτε πρώτα!");
    res.redirect('/');
};

middlewareObj.isManager = function(req, res, next){
    if(req.isAuthenticated() && req.user.type === 'manager'){
        return next();
    }
    req.flash("error", "Εεεεπ, τι κάνεις εκεί; Δεν έχεις κανένα δικαίωμα!");
    res.redirect('back');
};

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.type === 'admin'){
        return next();
    }
    req.flash("error", "This is confidential information! Who told you about this?");
    res.redirect('back');
};

middlewareObj.isDelivery = function(req, res, next){
    if(req.isAuthenticated() && req.user.type === 'deliveryman'){
        return next();
    }
    req.flash("error", "Εεεεπ, τι κάνεις εκεί; Δεν έχεις κανένα δικαίωμα!");
    res.redirect('back');
};

module.exports = middlewareObj;