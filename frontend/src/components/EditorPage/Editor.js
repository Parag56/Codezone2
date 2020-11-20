import React, { useEffect, useContext, useState } from "react";
import "./Editor.css";
import Editortop from "./Editorutils/Editortop/Editortop";
import Codearea from "./Editorutils/Codearea/Codearea";
import socketioclient from "socket.io-client";
import { AuthContext } from "../Context/Auth-context";
import names from "./names";
import Chatarea from "./Editorutils/Chatarea/Chatarea";
import "./Notification/Notification.css";
let socket;
const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
socket = socketioclient(ENDPOINT);
function Editor() {
  const [randomname, setrandomname] = useState(
    names[Math.floor(Math.random() * 57)]
  );
  const auth = useContext(AuthContext);

  // Notification handler
  useEffect(() => {
    socket.on("notification", (notifiername) => {
      const notification = document.createElement("Div");
      notification.classList.add("notificationouterpart");
      notification.innerHTML = `<h3>${notifiername} joined the room</h3>`;
      if (document.querySelector(".editorwholepage"))
        document.querySelector(".editorwholepage").appendChild(notification);

      //setting the display to none of the added persons
      setTimeout(() => {
        //removing the added join notification
        const docs = Array.from(
          document.querySelectorAll(".notificationouterpart")
        );
        for (let i = 0; i < docs.length; ++i) {
          document.querySelector(".editorwholepage").removeChild(docs[i]);
        }
      }, 5000);
    });

    //leave notification handler
    socket.on("leavenotification", (notifiername) => {
      const notification = document.createElement("Div");
      notification.classList.add("notificationouterpart");
      notification.innerHTML = `<h3>${notifiername} left the room</h3>`;
      if (document.querySelector(".editorwholepage"))
        document.querySelector(".editorwholepage").appendChild(notification);

      setTimeout(() => {
        //removing the added leave notification
        const docs = Array.from(
          document.querySelectorAll(".notificationouterpart")
        );
        for (let i = 0; i < docs.length; ++i) {
          document.querySelector(".editorwholepage").removeChild(docs[i]);
        }
      }, 5000);
    });
  });
  return (
    <div className="editorwholepage">
      <Editortop
        socket={socket}
        username={auth.username ? auth.username : randomname}
      />
      <div className="codeandvideo">
        <div className="codearea">
          <div className="codeareastyles">
            <Codearea
              socket={socket}
              personname={auth.username ? auth.username : randomname}
            />
          </div>
        </div>
        <div className="videoarea">
          <Chatarea personname={auth.username} socket={socket} />
        </div>
      </div>
    </div>
  );
}

export default Editor;
