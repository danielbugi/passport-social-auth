var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.send("Go back and register");
});

module.exports = router;
