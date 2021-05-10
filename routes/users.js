const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const passport = require("passport");

// User model
const User = require("../models/User");

// Login router
userRouter.get("/login", (req, res) => res.render("login"));

// Sign up router

userRouter.get("/signup", (req, res) => res.render("signup"));

userRouter.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }
  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //   Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //   User exist
        errors.push({ msg: "Email already in use" });
        res.render("signup", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          password2,
        });
        // Hash password
        bcrypt.genSalt(saltRounds, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set to hashed password
            newUser.password = hash;
            //    Save the user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Handle
userRouter.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = userRouter;
