import React from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'
import { trim } from 'jquery'
function Message({message:{text,user},name}) {
    let issentbycurrentuser=false
    const trimmedname=name.trim().toLowerCase()
    if(user.trim().toLowerCase()===trimmedname){
        issentbycurrentuser=true
    }
    console.log(name,trimmedname)
    return (
    issentbycurrentuser
    ?(
     <div className="messagecontainer justifyend">
      <p className="senttext">{trimmedname}</p>
      <div className="messagebox">
          <p className="messagetext">{ReactEmoji.emojify(text)}</p>
      </div>
     </div>
    ):(
        <div className="messagecontainer justifystart">
      <div className="messagebox">
          <p className="messagetext">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="senttext">{user}</p>
     </div>
    )
    )
}

export default Message
