const express = require("express");
const router = express.Router();

const authentication_controller = require("../controllers/authenticationController");

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", authentication_controller.signup_post);

module.exports = router;
