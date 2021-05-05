const express = require("express");
const userRouter = express.Router();

// Login router
userRouter.get("/login", (req, res) => res.render("Login"));

// Register router

userRouter.get("/signup", (req, res) => res.render("Signup"));

module.exports = userRouter;
