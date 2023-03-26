const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_HOST, PORT } = process.env;
const app = express();

const { createMessage, getAll } = require("./controlers/message");

app.use(cors());
const http = require("http").Server(app);
const socket = require("socket.io")(http, {
  cors: { origin: "http://localhost:3000" },
});

global.onlineUsers = new Map();

socket.on("conection", (user) => {
  user.emit("changeOnline", onlineUsers.size);
  user.on("addUser", async (data) => {
    onlineUsers.set(user.id, data.name);
    user.emit("changeOnline", onlineUsers.size);
    user.broadcast.emit("changeOnline", onlineUsers.size);
    const result = await getAll();
    user.emit("messageList", result);
  });
  user.on("newMessage", async (data) => {
    const result = await createMessage(data);
    user.broadcast.emit("oneMessage", result);
    user.emit("oneMessage", result);
  });
  user.on("disconnect", () => {
    onlineUsers.delete(user.id);
    user.broadcast.emit("changeOnline", onlineUsers.size);
  });
});

mongoose.connect(DB_HOST);
app.listen(PORT, () => {
  console.log("Server run");
});
