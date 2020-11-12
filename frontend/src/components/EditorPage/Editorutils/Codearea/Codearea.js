import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { ControlledEditor } from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import './Codearea.css'
import {code} from '../../default'
let handlechange;
function Codearea({socket}) {
  //state for mangaging the themes
  const [theme, setTheme] = useState("light");
  const [lang,setlang]=useState('cpp')
  //let us access the room id
  const roomId = useParams().uid

  //state for managing the code values
  const [editorvalue, seteditorvalue] = useState(code.cpp);
 
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
    socket.emit("inputchanged", ans);
  }

  //fires when theme of the editor is to be changed
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  
 const onLangSelectHandler = (e) => {
    const lang = e.target.value
    setlang(lang)
    seteditorvalue(code[lang])
}
const options = {
  selectOnLineNumbers: true,
  renderIndentGuides: true,
  colorDecorators: true,
  cursorBlinking: "blink",
  autoClosingQuotes: "always",
  find: {
      autoFindInSelection: "always"
  },
  snippetSuggestions: "inline"
};
  return (
    <div className="outsidedesign">
      <div className="topheader">
        <div className="themetog">
          <button onClick={toggleTheme}>Change Theme</button>
          
          <select id="lang" onChange={(e) => onLangSelectHandler(e)}>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
            </select>
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
        language={lang}
        options={options}
      />
    </div>
  );
}

export default Codearea;
