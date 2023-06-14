const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup_post = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username").custom(async (username) => {
    const existingUser = await User.findOne({
      username: username,
    }).exec();

    if (existingUser) {
      throw new Error("An account with this username already exists.");
    }
  }),
  body("first_name", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must contain between 8 and 20 characters")
    .isLength({ min: 8, max: 20 })
    .escape(),
  body("password_confirm", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      isMember: false,
    });

    req.typedUser = user;

    if (!errors.isEmpty()) {
      // There are errors, re render form with error messages
      res.render("sign-up", {
        user: user,
        errors: errors.array(),
      });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res, next) => {
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            isMember: false,
          });
          await user.save();
          res.redirect("/sign-in");
        }
      });
    } catch (err) {}
  }),
];
