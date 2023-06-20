const express = require("express");
const router = express.Router();

const authentication_controller = require("../controllers/authenticationController");

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", authentication_controller.signup_post);

router.get("/sign-in", authentication_controller.signin_get);

router.post("/sign-in", authentication_controller.signin_post);

router.post("/sign-out", authentication_controller.signout_post);

module.exports = router;
