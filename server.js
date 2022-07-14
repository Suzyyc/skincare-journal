require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const mongoDBSession = require("connect-mongodb-session");

const skincareRouter = require("./controllers/skincare");
const logRouter = require("./controllers/log");
const usersController = require("./controllers/users");
const sessionsController = require("./controllers/sessions");

const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;
const app = express();
const MongoDBStore = mongoDBSession(session);
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", sessionsController);
app.use("/users", usersController);
app.use("/skincare", skincareRouter);
app.use("/logs", logRouter);

app.use("/", (req, res) => {
  res.redirect("/login");
});

mongoose.connect(dbURL, () => {
  console.log("connected to MongoDB");
});

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
