const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const SecretCode = require("../models/secretcode");

exports.submit_code = [
  body("code", "Secret code must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("join-form", {
        errors: errors.array(),
        code: req.body.code,
      });
    } else {
      next();
    }
  }),

  asyncHandler(async (req, res, next) => {
    const secretCode = await SecretCode.findOne().exec();

    bcrypt.compare(req.body.code, secretCode.code, async (err, reso) => {
      if (reso) {
        // codes match
        await User.findByIdAndUpdate(req.user._id, {
          isMember: true,
        });
        res.redirect("/join");
      } else {
        // codes do not match
        res.render("join-form", {
          errors: [{ msg: "Secret code is not valid." }],
          code: req.body.code,
        });
      }
    });
  }),
];
