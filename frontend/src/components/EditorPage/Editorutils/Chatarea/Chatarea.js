import React, { useState } from "react";
import Chatjoin from "./Chatjoin";
import "./Chatarea.css";
import uuid from "react-uuid";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

function Chatarea({ name,socket }) {
  const [roomjoined, setroomjoined] = useState(false);
  const [username,setname]=useState(null)
  const [room,setroom]=useState(null)
  let chatroom = useParams().uid;
  return (
    <div className="chatbox">
      {!roomjoined && (
        <Chatjoin
          username={name}
          chatroom={chatroom}
          setroomjoined={setroomjoined}
          setname={setname}
          setroom={setroom}
        />
      )}
      {roomjoined && <Chat socket={socket} joinparam={{name:username,room:room}} />}
    </div>
  );
}

export default Chatarea;
