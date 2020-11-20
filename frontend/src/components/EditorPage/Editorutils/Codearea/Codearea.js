import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {ControlledEditor} from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import "./Codearea.css";
import { dummycode } from "../../default";
import $ from "jquery";
import LoadingAnim from "../../../Loader/Loader";
import  MyVerticallyCenteredModal5   from './Outputmodal'
import  MyVerticallyCenteredModal6   from './Inputmodal'
let handlechange;
function Codearea({ socket,personname }) {
  //states
  const [theme, setTheme] = useState("light");
  const [lang, setlang] = useState("cpp");
  const [editorvalue, seteditorvalue] = useState(dummycode.cpp);
  const [code, setcode] = useState(dummycode.cpp);
  const [userinput, setuserinput] = useState("");
  const [output, setoutput] = useState(``);
  const [compile,setcompile]=useState("")
  const [time,settime]=useState("")
  const [exitstatus,setexitstatus]=useState("")
  const [codeid,setcodeid]=useState("")
  const [isloading, setisloading] = useState(false);
  const [modalShow5, setModalShow5] = useState(false);
  const [modalShow6, setModalShow6] = useState(false);
  const [status,setstatus]=useState(false)
  //accessing the room id
  const roomId = useParams().uid;
  

  //emitting event for joining a room
  useEffect(() => {
    socket.emit("join-room", roomId,personname);
  }, []);
  //changing the state to the new updated value
  useEffect(() => {
    socket.on("changed-value", (changedvalue) => {
      seteditorvalue(changedvalue);
    });
  }, [editorvalue]);

  //fires when the value changes in the dummycode-editor
  handlechange = (e, value) => {
    const ans = value;
    setcode(value);
    socket.emit("inputchanged", ans);
  };

  //fires when theme of the editor is to be changed
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const onLangSelectHandler = (e) => {
    const lang = e.target.value;
    setlang(lang);
    seteditorvalue(dummycode[lang]);
  }
  const runcode = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/codezone/execution/run`;
    const data = {};
    
    data.code = code;
    data.input = userinput;
    data.language = lang;
    setisloading(true);
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url,
      success: function (data) {
        setisloading(false);
        setcodeid(data.response.code_id)
        setcompile(data.response.compile_status)
        settime(data.response.run_status.time_used)
        setoutput(data.response.run_status.output_html)
        setexitstatus(data.response.run_status.exit_code)
        setstatus(data.response.run_status.status_detail)
        setModalShow5(true)
      },
      error: function (err) {
        setisloading(false);
        console.log(err);
        setuserinput("")
      },
    });
  };
  const custominputhandler=()=>{
   setModalShow6(true)
  }
  const options = {
    selectOnLineNumbers: true,
    renderIndentGuides: true,
    colorDecorators: true,
    cursorBlinking: "blink",
    autoClosingQuotes: "always",
    find: {
      autoFindInSelection: "always",
    },
    snippetSuggestions: "inline",
  };
  return (
    <div className="outsidedesign">
      {isloading && <LoadingAnim />}
      <MyVerticallyCenteredModal5
          id={codeid}
          compile={compile}
          time={time}
          show={modalShow5}
          onHide={() => setModalShow5(false)}
          output={output}
          status={status}
          exitcode={exitstatus}
          />
         <MyVerticallyCenteredModal6
          show={modalShow6}
          setuserinput={setuserinput}
          userinput={userinput}
          onHide={() =>{ setModalShow6(false)
             document.getElementById('custominput').checked=false}}
          />
      <div className="topheader">
        <div className="themetog">
          <button onClick={toggleTheme}>Change Theme</button>
          <select id="lang" onChange={(e) => onLangSelectHandler(e)}>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
          <button className="runbtn" onClick={runcode}>
            Run
          </button>
          <div className="new">
         <form>
    <div className="custominput">
      <input type="checkbox" id="custominput" onChange={custominputhandler}/>
      <label htmlFor="custominput">Custom Input</label>
    </div>
  </form>
</div>
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
