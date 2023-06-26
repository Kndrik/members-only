const Message = require("../models/message");

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.post_new_message = [
  body("title", "The title must contain between 1 and 30 characters.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("message", "The message must contain between 1 and 300 characters.")
    .trim()
    .isLength({ min: 1, max: 300 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      content: req.body.message,
      user: req.user,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      res.render("message-form", {
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/board");
    }
  }),
];
