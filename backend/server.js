const express = require("express");
const userRoute = require("./routers/user");
const codeRoute = require("./routers/code");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./models/Http-error");
// const { ExpressPeerServer } = require('peer')

const bodyparser = require("body-parser");
const app = express();
app.use(cors());
const server = require("http").createServer(app);
// const peerServer = ExpressPeerServer(server,{
// debug:true
// }
// )
const io = require("socket.io")(server);
app.use(bodyparser.json());
// app.use('/peerjs', peerServer)
app.use("/livecode/user", userRoute); //all the req will be on /livecode/user
app.use("/livecode/code", codeRoute); //all the req will be on /livecode/code
app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});

//connecting to the socket io

io.on("connection", (socket) => {
  console.log("New client connected");

  //handling the room joining
  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    // socket.to(roomID).broadcast.emit("user-connected", uid);
    socket.on("drawing", (data) =>
      socket.to(roomID).broadcast.emit("drawing", data)
    );
    socket.on("inputchanged", (value) => {
      socket.to(roomID).broadcast.emit("changed-value", value);
    });

    socket.on("disconnect", () => {
      console.log("user-disconnected");
      // socket.to(roomID).broadcast.emit("user-disconnected", uid);
    });
  });
});

mongoose
  .connect(
    "mongodb+srv://Paragthakur:Q49OO306N1iMnME1@cluster0.n7rtf.gcp.mongodb.net/LiveCode?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    server.listen("5000", () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
