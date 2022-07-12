const express = require("express");
const logRouter = express.Router();
const kinds = require("../data/product-kinds");

const Log = require(`../models/log`);
const SkincareProduct = require("../models/skincare");

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

logRouter.use(isLoggedIn);

//============
//Index GET /
//============
logRouter.get("/", (req, res) => {
  Log.find({}, null, { sort: { date: -1 } })
    .exec()
    .then((logs) => {
      SkincareProduct.find()
        .exec()
        .then((products) => {
          const mappedProducts = products.map((product) => {
            const kind = kinds.find((kind) => product.kind === kind.value);
            product.kind = kind.label;
            return product;
          });
          res.render("logs/index.ejs", {
            currentUser: req.session.currentUser,
            logs: logs,
            products: mappedProducts,
            tabTitle: "Log & Skincare",
          });
        });
    });
});

//============
//NEW GET /new
//============
logRouter.get("/new", (req, res) => {
  res.render("logs/new.ejs", {
    tabTitle: "New Journal Summary",
    currentUser: req.session.currentUser,
  });
});

//=============
//Show GET /;id
//=============
logRouter.get("/:id", (req, res) => {
  Log.findById(req.params.id)
    .exec()
    .then((log) => {
      SkincareProduct.find({ _id: { $in: log.productIds } })
        .exec()
        .then((products) => {
          res.render("logs/show.ejs", {
            log: log,
            products: products,
            currentUser: req.session.currentUser,
            tabTitle: "Log & Skincare Journal",
          });
        });
    });
});

//===================
//Edit GET / :id/edit
//===================
logRouter.get("/:id/edit", (req, res) => {
  Log.findById(req.params.id)
    .exec()
    .then((log) => {
      SkincareProduct.find()
        .exec()
        .then((products) => {
          res.render("logs/edit.ejs", {
            log: log,
            products: products,
            currentUser: req.session.currentUser,
            tabTitle: "Edit Journal Summary",
          });
        });
    });
});

//=============
//CREATE POST/
//=============
logRouter.post("/", (req, res) => {
  Log.create(req.body).then((log) => {
    res.redirect("/logs/" + log.id, {
      currentUser: req.session.currentUser,
    });
  });
});

//================
//UPDATE PUT /:id
//================
logRouter.put("/:id", (req, res) => {
  console.log(req.body);
  if (req.body.productIds === undefined) {
    req.body.productIds = [];
  }
  Log.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then((newLog) => {
      res.redirect(`/logs/${newLog.id}`, {
        currentUser: req.session.currentUser,
      });
    });
});

//===================
//DESTROY DELETE /;id
//===================
logRouter.delete("/:id", (req, res) => {
  Log.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
      res.redirect("/logs");
    });
});

module.exports = logRouter;
