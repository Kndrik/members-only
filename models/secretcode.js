const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SecretCodeModel = new Schema({
  code: { type: String, required: true },
});

module.exports = mongoose.model("SecretCode", SecretCodeModel);
