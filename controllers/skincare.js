const express = require("express");
const skincareRouter = express.Router();

const SkincareProduct = require("../models/skincare");

//============
//NEW GET /new
//============
skincareRouter.get("/new", (req, res) => {
  res.render("../views/products/new.ejs", {
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
// skincareRouter.put("/:id", (req, res) => {
//   SkincareProduct.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => {
//       res.redirect("/" + req.params.id);
//     });
// });

//===================
//DESTROY DELETE /;id
//===================
// skincareRouter.delete("/:id", (req, res) => {
//   SkincareProduct.findByIdAndDelete(req.params.id)
//     .exec()
//     .then(() => {
//       res.redirect("/");
//     });
// });

module.exports = skincareRouter;
