const Message = require("../models/message");

const createMessage = async (data) => await Message.create(data);
const getAll = async () => await Message.find();

module.exports = { createMessage, getAll };
