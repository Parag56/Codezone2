import React, { useEffect, useState } from "react";
import "./Chat.css";
import Messages from "./Messages";
function Chat({ socket, joinparam }) {
  const ENDPOINT = socket.io.uri;
  const [username, setname] = useState(joinparam.name);
  const [room, setroom] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    setname(joinparam.name);
    setroom(joinparam.room);
    console.log(joinparam);
    socket.emit("chat-room", username);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, joinparam]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setmessages([...messages, message]);
    });
  }, [messages]);
  const sendmessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendmessage", message, () => {
        setmessage("");
      });
    }
  };
  console.log(message, messages);
  useEffect(() => {
    const msgerChat = document.querySelector(".msger-chat");
    msgerChat.scrollTop += 500;
  });
  return (
    <div className="chatpart">
      <main className="msger-chat">
        <Messages Messages={messages} name={username} />
      </main>

      <form class="msger-inputarea">
        <input
          type="text"
          className="msger-input"
          value={message}
          placeholder="Type a message...."
          onChange={(event) => {
            setmessage(event.target.value);
          }}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendmessage(event) : null
          }
        />
        <button
          type="submit"
          onClick={(event) => {
            sendmessage(event);
          }}
          className="msger-send-btn"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
