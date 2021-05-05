const express = require("express");
const userRouter = express.Router();

// Login router
userRouter.get("/login", (req, res) => res.send("Login"));

// Register router

userRouter.get("/register", (req, res) => res.send("Register"));

module.exports = userRouter;
