const express = require("express");
const expressSession = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/index");
const userRouter = require("./routes/users");
const app = express();

// configuration for EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", router);
app.use("/users", userRouter);

app.listen("3000", () => {
  console.log("Express is running on port 3000");
});
