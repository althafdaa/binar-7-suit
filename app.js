const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("SecretApp"));
app.use(
  session({
    secret: "SecretApp",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("cek session", req.session.id);
  console.log("cek user", req.user);
  next();
});

// router
app.use("/");

module.exports = app;
