import React, { Component } from 'react'

 class MessagesList extends Component {
  render() {
        
     return (
       <div className="message-list">
         
          {this.props.messages.map((message, index) => { return(
             <div key={index}  className="message">
             <div>                
                  <div className ="message-username">@{message.senderId}</div>{' '}
              </div>
              <div  className ="message-text">{message.text}</div>         
    </div>
          )})}
         
      </div>
    )
   }
 }

 export default MessagesList
