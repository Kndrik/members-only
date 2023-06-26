const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.submit_code = [
  body("code", "The secret code is not valid.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
];
