const express = require("express");
const userRoute = require("./routers/user");
const codeRoute = require("./routers/code");
const mongoose = require("mongoose");
const HttpError = require("./models/Http-error");


const bodyparser = require("body-parser");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);
app.use(bodyparser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
  next()
})
app.use("/codezone/user", userRoute); //all the req will be on /livecode/user
app.use("/codezone/code", codeRoute); //all the req will be on /livecode/code
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
    socket.on('chat-room',(username)=>{
      socket.emit('message',{text:`Welcome ${username} to the chat`,user:username})
      socket.to(roomID).broadcast.emit('message',{text:`${username} joined`,user:username})
      
    socket.on('sendmessage',(message,callback)=>{
      io.to(roomID).emit('message',{text:message,user:username})
      callback()
    })
    })

    socket.on("drawing", (data) =>
      socket.to(roomID).broadcast.emit("drawing", data)
    );
    socket.on("inputchanged", (value) => {
      socket.to(roomID).broadcast.emit("changed-value", value);
    });
   
    socket.on("disconnect", () => {
      console.log("user-disconnected");
    });
  });
});

mongoose
  .connect(
    "mongodb+srv://Paragthakur:Q49OO306N1iMnME1@cluster0.n7rtf.gcp.mongodb.net/CodeZone?retryWrites=true&w=majority",
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
