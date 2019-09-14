var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Render registration form
router.get("/register", (req, res) => {
  res.render("register")
})

// Post request from the registration form
router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    res.redirect("/users/login");
  })
})

// Render login form
router.get("/login", (req, res) => {
  res.render("login")
})

// Post request from the registration form
router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email: email}, (err, user) => { // We try to find the user by email
    console.log(err, user);
    if (err) return res.redirect("/users/login");
    if (!user) return res.redirect("/users/login");
    if (!user.validatePassword(password)) { // If the user enters a wrong password- redirect him to the login page.
      return res.redirect("/users/login");
    }
    req.session.userId = user.id; // If it works, a session will be created; cookie is generated, and redirects the user to the index page.
    res.redirect('/');
  })
})


router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login")
})

// Exporting the module
module.exports = router;
