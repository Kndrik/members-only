var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    console.log("There is a user");
    res.render("index", { title: "Welcome" });
  } else {
    console.log("There is no user");
    res.redirect("/sign-in");
  }
});

module.exports = router;
