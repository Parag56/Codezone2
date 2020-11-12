import React from 'react'
import { useState,useContext } from 'react'
import './Chatjoin.css'
import {AuthContext} from '../../../Context/Auth-context'
import MyVerticallyCenteredModal4 from '../../../Login/LoginModal'
function Chatjoin({username,chatroom,setroomjoined,setname,setroom}) {
   
    const [modalShow4, setModalShow4] = useState(false);
    const auth=useContext(AuthContext)
    const startchathandler=()=>{
    setroom(chatroom)
    setname(username)
    setroomjoined(true)
    }
    return (
        <div className="chatjoin">
          <h1>Code<span>zone</span> Chatroom</h1>
         {!auth.isloggedin &&(
          <div className="startchat">
            <button className="joinchatbtn" onClick={()=>setModalShow4(true)}>Start Chat</button>
            <MyVerticallyCenteredModal4
                show={modalShow4}
                onHide={() => setModalShow4(false)}
              />
          </div>
         )}
         {auth.isloggedin&&(
           <div className="startchat">
           <button className="joinchatbtn" onClick={startchathandler}>Start Chat</button>
         </div>
         )}
        </div>
    )
}

export default Chatjoin
