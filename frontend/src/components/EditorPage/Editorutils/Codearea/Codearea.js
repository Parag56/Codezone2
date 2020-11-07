import React, { useState, useEffect } from "react";
import socketioclient from "socket.io-client";
import { useParams } from 'react-router-dom'
import { ControlledEditor } from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import './Codearea.css'
let handlechange;
function Codearea({socket}) {
  //state for mangaging the themes
  const [theme, setTheme] = useState("light");

  //let us access the room id
  const roomId = useParams().uid

  //state for managing the code values
  const [editorvalue, seteditorvalue] = useState("Hello world");
 
  // for joining the room 
  useEffect(() => {
    socket.emit('join-room', roomId)
  }, [])


  //changing the state to the new updated value
  useEffect(() => {
    socket.on("changed-value", (changedvalue) => {
      seteditorvalue(changedvalue);
    });
  }, [editorvalue])


  //fires when the value changes in the code-editor
  handlechange = (e, value) => {
    const ans = value;
    console.log(value)
    socket.emit("inputchanged", ans);
  }

  //fires when theme of the editor is to be changed
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }


  return (
    <div className="outsidedesign">
      <div className="topheader">
        <div className="themetog">
          <button onClick={toggleTheme}>Change Theme</button>
          <button className="runbtn">Run</button>
        </div>
      </div>
      <ControlledEditor
        className="editorstyles"
        onChange={handlechange}
        height="24rem"
        style="border:2px solid gray"
        width="40rem"
        value={editorvalue}
        theme={theme}
        loading={<Loader />}
        language="cpp"
      />
    </div>
  );
}

export default Codearea;
