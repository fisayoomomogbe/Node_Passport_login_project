const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config.env") });

const express = require("express");
const expressSession = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/index");
const userRouter = require("./routes/users");
const User = require("./models/User");
const app = express();

// configuration for EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);
app.use("/users", userRouter);

app.listen("3000", () => {
  console.log("Express is running on port 3000");
});
