const express = require("express");
const logRouter = express.Router();

const Log = require(`../models/log`);
const SkincareProduct = require("../models/skincare");

//============
//Index GET /
//============
logRouter.get("/", (req, res) => {
  Log.find()
    .exec()
    .then((logs) => {
      // console.log(logs);
      SkincareProduct.find()
        .exec()
        .then((products) => {
          console.log(logs);
          console.log(products);
          res.render("../views/logs/index.ejs", {
            logs: logs,
            products: products,
            tabTitle: "Log & Skincare",
          });
        });
    });
});

//============
//NEW GET /new
//============
//logRouter.get("/new", (req, res) => {
//   res.render("../views/products/new.ejs");
// });

//=============
//Show GET /;id
//=============
logRouter.get("/:id", (req, res) => {
  Log.findById(req.params.id)
    .exec()
    .then((log) => {
      console.log(log);
      SkincareProduct.find({ _id: { $in: log.productIds } })
        .exec()
        .then((products) => {
          console.log(log);
          console.log(products);
          res.render("../views/logs/show.ejs", {
            log: log,
            products: products,
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
      res.render("logs/edit.ejs", {
        log: log,
      });
    });
});

//=============
//CREATE POST/
//=============
// {description: "", date: "", productIds: ["", ""]}
// logRouter.post("/logs", (req, res) => {
//   Log.create(req.body).then((log) => {
//     res.redirect("/" + log.id);
//   });
// });

//================
//UPDATE PUT /:id
//================
// logRouter.put("/:id", (req, res) => {
//   Log.findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => {
//       res.redirect("/" + req.params.id);
//     });
// });

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
