import React from 'react'
import MessageList from './MessageList'
import TypingIndicator from './TypingIndicator'
import SendMessageForm from './SendMessageForm'
class MessagePopup extends React.Component
    {
    //recalculate when window is loaded and also when window is resized.
    constructor(){
        super();
     this.close_popup=this.close_popup.bind(this);
    }
  
  close_popup(){
      this.props.close_popup(this.props.name)

  }

render(){
   
    return(
         <div>
        <div className="popup-head">
        <h4>{this.props.name}</h4>
        <div className="popup-head-icone">
        <i class="fa fa-phone"></i>
        <i class="fa fa-video-camera"></i>
        <i class="fa fa-info-circle"></i>
        <a href="#" onClick={this.close_popup}>&#10005;</a>
        </div>
        </div>
        <div>
        <MessageList
                    messages={this.props.messages}
                    
                  />
          <TypingIndicator usersWhoAreTyping={this.props.usersWhoAreTyping} />
          <SendMessageForm
                    onSubmit={this.props.sendMessage}
                    onChange={this.props.sendTypingEvent}
                />
        
         
        </div>
        </div>     
        

    )
    
                  
    
          
    
}
    }
export default MessagePopup