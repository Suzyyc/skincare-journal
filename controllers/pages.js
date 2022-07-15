const express = require("express");
const pagesRouter = express.Router();

pagesRouter.get("/aboutme", (req, res) => {
  res.render("pages/aboutme.ejs", {
    currentUser: req.session.currentUser,
    baseUrl: req.baseUrl,
    tabTitle: "Sign Up",
  });
});

module.exports = pagesRouter;
