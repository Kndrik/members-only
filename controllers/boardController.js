const Message = require("../models/message");

const asyncHandler = require("express-async-handler");

exports.display_messages = asyncHandler(async (req, res, next) => {
  const message_list = await Message.find()
    .populate("user")
    .sort({ date: -1 })
    .exec();

  const modified_list = message_list.map((message) => {
    let newMessage = message;
    if (req.user && req.user.isMember) {
      newMessage.isAnonymous = false;
    } else {
      newMessage.isAnonymous = true;
    }
    return newMessage;
  });

  res.render("board", {
    title: "All messages",
    message_list: modified_list,
  });
});
