const withAuth = (req, res, next) => {
<<<<<<< HEAD
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
=======
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
>>>>>>> main
