const express = require("express");
const skincareRouter = express.Router();
const kinds = require("../data/product-kinds");

const SkincareProduct = require("../models/skincare");

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  req.app.locals.currentUser = req.session.currentUser;
  next();
};

skincareRouter.use(isLoggedIn);

//============
//NEW GET /new
//============
skincareRouter.get("/new", (req, res) => {
  res.render("products/new.ejs", {
    tabTitle: "New Product",
  });
});

//===================
//Edit GET / :id/edit
//===================
skincareRouter.get("/:id/edit", (req, res) => {
  //   res.send("edit product with id " + req.params.id);
  SkincareProduct.findById(req.params.id)
    .exec()
    .then((product) => {
      res.render("products/edit.ejs", {
        product: product,
        tabTitle: "Edit Product",
        kinds: kinds,
      });
    });
});

//=============
//CREATE POST/
//=============
skincareRouter.post("/", (req, res) => {
  console.log(req.body);
  SkincareProduct.create(req.body).then(() => {
    res.redirect("/logs");
  });
});

//================
//UPDATE PUT /:id
//================
skincareRouter.put("/:id", (req, res) => {
  SkincareProduct.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(() => {
      res.redirect("/logs");
    });
});

//===================
//DESTROY DELETE /;id
//===================
skincareRouter.delete("/:id", (req, res) => {
  SkincareProduct.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
      res.redirect("/logs");
    });
});

module.exports = skincareRouter;
