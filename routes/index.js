// Dependencies:

const express = require("express");
const passport = require("passport");
const router = new express.Router();
const storesRouter = require("./stores");
const vehiclesRouter = require("./vehicles");
const swaggerRouter = require("./swagger");

// Routes:

router.use("/stores", storesRouter);
router.use("/vehicles", vehiclesRouter);
router.use("/api-docs", swaggerRouter);

router.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? { message: `Connected as: ${req.session.user.username}` }
      : { message: "Not connected" },
  );
});
router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
router.get(
  "/auth/github/callback", // Correct route name
  passport.authenticate("github", { failureRedirect: "/api-docs", session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

// Export router.
module.exports = router;
