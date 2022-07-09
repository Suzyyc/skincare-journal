const express = require("express");
const skincareRouter = express.Router();

const Skincare = require("../models/skincare");
const Log = require(`../models/logs`);

//============
//Index GET /
//============
skincareRouter.get("/", (req, res) => {
  Skincare.find()
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
//   SKincare.findById(req.params.id)
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
//   Skincare.findById(req.params.id)
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
//   Skincare.create(req.body).then((skincare) => {
//     res.redirect("/" + skincare.id);
//   });
// });

//================
//UPDATE PUT /:id
//================
// skincareRouter.put("/:id", (req, res) => {
//   Skincare.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => {
//       res.redirect("/" + req.params.id);
//     });
// });

//===================
//DESTROY DELETE /;id
//===================
// skincareRouter.delete("/:id", (req, res) => {
//   Skincare.findByIdAndDelete(req.params.id)
//     .exec()
//     .then(() => {
//       res.redirect("/");
//     });
// });

module.exports = skincareRouter;
