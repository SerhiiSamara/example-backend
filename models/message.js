const { Schema, model } = require("mongoose");

const messageSchema = Schema({
  name: String,
  text: String,
});

const Message = model("message", messageSchema);

module.exports = Message;
