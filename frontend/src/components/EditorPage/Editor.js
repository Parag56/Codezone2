import React,{useEffect,useContext,useState} from 'react'
import './Editor.css'
import Editortop from './Editorutils/Editortop/Editortop'
import Codearea from './Editorutils/Codearea/Codearea'
import socketioclient from 'socket.io-client'
import $ from 'jquery'
import {AuthContext} from '../Context/Auth-context'
import names from './names'
import Chatarea from './Editorutils/Chatarea/Chatarea'
let socket;
const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
socket=socketioclient(ENDPOINT)
function Editor() {
        const [username,setusername]=useState(null)
        const auth=useContext(AuthContext)
        useEffect(()=>{
            const uid=auth.userid
            if(uid!=null){
            const url=`${process.env.REACT_APP_BACKEND_URL}/codezone/user/${uid}`
            $.ajax({
              type:'GET',
              crossDomain:true,
              dataType:'json',
              url,
              success:function(data){
                  setusername(data.user.name)
              },
              error:function(err){
                  console.log(err.message)
              }
            })
        }
        },[auth.userid,username])
       
    return (
        <div>
           <Editortop socket={socket} username={username?username:names[Math.floor(Math.random()*57)]}/>
           <div className="codeandvideo">
              <div className="codearea">
                  <div className="codeareastyles">
                  <Codearea socket={socket}/>
                  </div>
              </div>
            <div className="videoarea">
                <Chatarea name={username} socket={socket}/>
            </div>
           </div>
        </div>
    )
}

export default Editor