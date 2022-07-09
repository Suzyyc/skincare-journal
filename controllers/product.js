const express = require("express");

const productRouter = express.Router();

// const Product = require("../models/products");

//============
//Index GET /
//============
productRouter.get("/", (req, res) => {
  //   Product.find()
  //     .exec()
  //     .then((products) => {
  //   res.send(products);
  res.send("hi");
  // });
});

//============
//NEW GET /new
//============
// productRouter.get("/new", (req, res) => {
//   res.render("../views/products/new.ejs");
// });

//=============
//Show GET /;id
//=============
// productRouter.get("/:id", (req, res) => {
//   Product.findById(req.params.id)
//     .exec()
//     .then((product) => {
//       res.render("../views/products/show.ejs", {
//         product: product,
//       });
//     });
// });

//===================
//Edit GET / :id/edit
//===================
// productRouter.get("/:id/edit", (req, res) => {
//   //   res.send("edit product with id " + req.params.id);
//   Product.findById(req.params.id)
//     .exec()
//     .then((product) => {
//       res.render("products/edit.ejs", {
//         product: product,
//       });
//     });
// });

//=============
//CREATE POST/
//=============
// productRouter.post("/", (req, res) => {
//   Product.create(req.body).then((product) => {
//     res.redirect("/" + product.id);
//   });
// });

//================
//UPDATE PUT /:id
//================
// productRouter.put("/:id", (req, res) => {
//   Product.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => {
//       res.redirect("/" + req.params.id);
//     });
// });

//===================
//DESTROY DELETE /;id
//===================
// productRouter.delete("/:id", (req, res) => {
//   Product.findByIdAndDelete(req.params.id)
//     .exec()
//     .then(() => {
//       res.redirect("/");
//     });
// });

module.exports = productRouter;
