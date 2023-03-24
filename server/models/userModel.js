const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  someID: String,
});

module.exports = mongoose.model("users", User);
