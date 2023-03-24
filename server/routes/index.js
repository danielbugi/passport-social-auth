const express = require("express");
const passport = require("passport");
const passportLinkedIn = require("../auth/linkedin");
const passportGithub = require("../auth/github");
const passportTwitter = require("../auth/twitter");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.send("Go back and register");
});

// linkedin routes
router.get("/auth/linkedin", passportLinkedIn.authenticate("linkedin"));

router.get(
  "/auth/linkedin/callback",
  passportLinkedIn.authenticate("linkedin", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication
    res.json(req.user);
  }
);

// github routes

router.get(
  "/auth/github",
  passportGithub.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passportGithub.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication
    res.json(req.user);
  }
);

// Twitter routes

router.get("/auth/twitter", passportTwitter.authenticate("twitter"));

router.get(
  "/auth/twitter/callback",
  passportTwitter.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication
    res.json(req.user);
  }
);

module.exports = router;
