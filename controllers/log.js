const express = require("express");
const logRouter = express.Router();
const kinds = require("../data/product-kinds");

const Log = require(`../models/log`);
const SkincareProduct = require("../models/skincare");

const isLoggedIn = (req, res, next) => {
  console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  req.app.locals.currentUser = req.session.currentUser;
  next();
};

logRouter.use(isLoggedIn);

const mapProducts = (products, kinds) => {
  const mappedProducts = products.map((product) => {
    const kind = kinds.find((kind) => product.kind === kind.value);
    product.kind = kind.label;
    return product;
  });
  return mappedProducts;
};

//============
//Index GET /
//============
logRouter.get("/", (req, res) => {
  Log.find({ userId: req.session.currentUser._id }, null, {
    sort: { date: -1 },
  })
    .exec()
    .then((logs) => {
      SkincareProduct.find({ userId: req.session.currentUser._id })
        .exec()
        .then((products) => {
          res.render("logs/index.ejs", {
            logs: logs,
            products: mapProducts(products, kinds),
            tabTitle: "Log & Skincare",
          });
        });
    });
});

//============
//NEW GET /new
//============
logRouter.get("/new", (req, res) => {
  SkincareProduct.find({ userId: req.session.currentUser._id })
    .exec()
    .then((products) => {
      res.render("logs/new.ejs", {
        tabTitle: "New Journal Summary",
        kinds: kinds,
        products: mapProducts(products, kinds),
      });
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
          console.log(log);
          res.render("logs/show.ejs", {
            log: log,
            products: mapProducts(products, kinds),
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
            products: mapProducts(products, kinds),
            tabTitle: "Edit Journal Summary",
          });
        });
    });
});

//=============
//CREATE POST/
//=============
logRouter.post("/", (req, res) => {
  req.body.userId = req.session.currentUser._id;
  Log.create(req.body).then((log) => {
    res.redirect("/logs/" + log.id);
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
      res.redirect(`/logs/${newLog.id}`);
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
