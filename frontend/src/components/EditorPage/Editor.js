import React,{useEffect} from 'react'
import './Editor.css'
import Editortop from './Editorutils/Editortop/Editortop'
import Codearea from './Editorutils/Codearea/Codearea'
import socketioclient from 'socket.io-client'
let socket;
const ENDPOINT = "http://localhost:5000/";
function Editor() {
        socket=socketioclient(ENDPOINT)

       
    return (
        <div>
           <Editortop socket={socket}/>
           <div className="codeandvideo">
              <div className="codearea">
                  <div className="codeareastyles">
                  <Codearea socket={socket}/>
                  </div>
              </div>
             
            <div className="videoarea">
                <h2>Video Area</h2>

            </div>
           </div>
        </div>
    )
}

export default Editor
