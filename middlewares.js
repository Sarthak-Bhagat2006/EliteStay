module.exports.isLoggedIn = (req, res, next) => {
    console.log("Checking authentication for:", req.originalUrl);
    if (!req.isAuthenticated()) {
        
        req.session.redirectUrl = req.originalUrl;
        
        req.flash("error", "You must be logged in to create new Listing");
        return res.redirect("/login");
    }
    
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      console.log("User NOT authenticated. Saving redirect URL:", req.session.redirectUrl);

    }
    next(); // ✅ this line is important
  };