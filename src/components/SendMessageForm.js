import React, { Component } from 'react'

class SendMessageForm extends Component {
 constructor(Props) {
 super(Props)
  this.state = {
    text: ''
  }
  this.onChange = this.onChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)

}

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  onChange(e) {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
   
         return (
            
            
              
                <div className="msg-buttom">
                <form onSubmit={this.onSubmit}  className="buttom-input">
                  <input className="message-input"
                    type="text"
                    placeholder="Type a message here then hit ENTER"
                     onChange={this.onChange}
                    value={this.state.text}
                    
                   />
                    <span className="message-input-text">
                   <i class="fa fa-paper-plane"></i>
                   </span>
                   <span className="vocal">
                   <i class="fa fa-microphone"></i>
                   </span>
                    </form>
                    <div className="buttom-icone">
                    <i class="fa fa-plus-circle"></i>
                    <i class="fa fa-camera"></i>
                    <i class="fa fa-smile-o"></i>
                    <i class="fa fa-paperclip"></i>
                    <i class="fa fa-image"></i>

                    </div>
                  
             
               </div>
               
                   
           )
         }
       }
      
export default SendMessageForm