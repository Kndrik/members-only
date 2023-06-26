var express = require("express");
var router = express.Router();
const board_controller = require("../controllers/boardController");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    console.log("There is a user");
    res.redirect("/board");
  } else {
    console.log("There is no user");
    res.redirect("/sign-in");
  }
});

router.get("/board", board_controller.display_messages);

module.exports = router;
