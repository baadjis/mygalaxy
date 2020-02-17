import React from 'react';
import Particles from 'react-particles-js';
import styles from './users.css'
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.addClass=this.addClass.bind(this)
        this.removeClass=this.addClass.bind(this)
        this.onFocusedinput=this.onFocusedinput.bind(this)
        this.onClickbutton=this.onClickbutton.bind(this)
        this.timeout=this.timeout.bind(this)
    }
    onChange(e){
        this.setState({
             [e.target.name]:e.target.value
        })
        
    }
   async onSubmit(e){
      
        
        e.preventDefault();
        //el=document.getElementById("login-form")
        this.removeClass(document.getElementById("login-form"),"focused");
        
        this.addClass(document.getElementById("login-form"),"loading")
        await  this.timeout(1500)
        this.removeClass(document.getElementById("login-form"),"loading");
        if (document.getElementById("login-form")){
          document.getElementById("login-form").style.display="none"
          document.body.style="null";
        }
       
        this.props.onSubmit(this.state.username)
    
    }
    //i hate jquery
    addClass(el, className) {
        if(el){
        if  (el.classList) { el.classList.add(className); }
        else { el.className += ' ' + className; }}
    }
    //i hate jquery
    removeClass(el, className) {
      if(el){
      if (el.classList) { el.classList.remove(className); }
      else { el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
  }}
  async onFocusedinput(){
    //el=document.getElementById("login-form")
    this.addClass(document.getElementById("login-form"),"focused");
  }
   async onClickbutton(e)
   {
    
   }
   timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
      render() {
        
         return (
            <div>
              
                <div className="login-form" id="login-form">
                <div class="front-face">
               <span class="text">LOGIN</span><br></br>
               <span class="loader" id="loaderspan"></span>
                <p class="text">Enter to the galaxy</p>
                </div>
                   <form onSubmit={this.onSubmit}>
                   
                     <input class="input"
                   type="text"
                   placeholder="Your user name" name="username"
                   value={this.state.username}
                   onChange={this.onChange}
                    onFocus={this.onFocusedinput} required/>
                  
                     
                     <input class="input"
                   type="password"
                   placeholder="password"  name="password"
                   onChange={this.onChange}
                    onFocus={this.onFocusedinput} required/>
                    
          <input type="submit" value="Enter" />
                    
                   </form>
                   </div>
                  </div>
                  
               
             )
           }
          }
          
           export default LoginForm