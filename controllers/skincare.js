const express = require("express");
const skincareRouter = express.Router();

const SkincareProduct = require("../models/skincare");

//============
//Index GET /
//============
skincareRouter.get("/", (req, res) => {
  SkincareProduct.find()
    .exec()
    .then((SkincareProducts) => {
      res.send(SkincareProducts);
    });
});

//============
//NEW GET /new
//============
// skincareRouter.get("/new", (req, res) => {
//   res.render("../views/products/new.ejs");
// });

//=============
//Show GET /;id
//=============
// skincareRouter.get("/:id", (req, res) => {
//   SkincareProducts.findById(req.params.id)
//     .exec()
//     .then((product) => {
//       res.render("../views/products/show.ejs", {
//         skincare: skincare,
//       });
//     });
// });

//===================
//Edit GET / :id/edit
//===================
// skincareRouter.get("/:id/edit", (req, res) => {
//   //   res.send("edit product with id " + req.params.id);
//   SkincareProducts.findById(req.params.id)
//     .exec()
//     .then((skincare) => {
//       res.render("products/edit.ejs", {
//           skincare: skincare,
//       });
//     });
// });

//=============
//CREATE POST/
//=============
// skincareRouter.post("/", (req, res) => {
//   SkincareProducts.create(req.body).then((skincare) => {
//     res.redirect("/" + skincare.id);
//   });
// });

//================
//UPDATE PUT /:id
//================
// skincareRouter.put("/:id", (req, res) => {
//   SkincareProducts.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => {
//       res.redirect("/" + req.params.id);
//     });
// });

//===================
//DESTROY DELETE /;id
//===================
// skincareRouter.delete("/:id", (req, res) => {
//   SkincareProducts.findByIdAndDelete(req.params.id)
//     .exec()
//     .then(() => {
//       res.redirect("/");
//     });
// });

module.exports = skincareRouter;
