import React ,{useEffect} from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'
function Message({message:{text,user},name}) {
    let issentbycurrentuser=false
     
    const trimmedname=name.trim().toLowerCase()
    
    if(user.trim().toLowerCase()===trimmedname){
        issentbycurrentuser=true
    }
   
    
    return (
    issentbycurrentuser
    ?(
     <div className="messagecontainer justifyend">
         <div className="messagebox">
      <span className="senttext">{trimmedname}</span>
          <p className="messagetext">{ReactEmoji.emojify(text)}</p>
     </div>
     </div>
    ):(
        <div className="messagecontainer justifystart">
         <div className="messagebox">
      <span className="senttext">{user}</span>
          <p className="messagetext">{ReactEmoji.emojify(text)}</p>
      </div>
     </div>
    )
    )
}

export default Message
