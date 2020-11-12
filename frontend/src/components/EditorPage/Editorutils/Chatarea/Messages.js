import React from 'react'
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'
function Messages({Messages,name}) {
    return (
      
<ScrollToBottom className="messages">
        {Messages.map((message,i)=><div key={i}><Message message={message} name={name}/></div>)}
        </ScrollToBottom>
  
        
    )
}

export default Messages
