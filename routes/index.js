var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    console.log("There is a user");
    res.render("index", { title: "Welcome" });
  } else {
    res.render("sign-in");
  }
});

module.exports = router;
