import React from 'react';
import Particles from 'react-particles-js';
import LoginForm from './login.js'
import RegisterForm from  './register.js'
import backgrounimg from '../galaxy.jpg'
import srcimg from '../User-Profile.png'
class UsernameForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
          islogin:true,
          isregister:false
          
        }
        
        this.showLoginform=this.showLoginform.bind(this)
        this.showRegisterform=this.showRegisterform.bind(this)

    }
    showLoginform(){
      this.setState({islogin:true,isregister:false})

    }
    showRegisterform(){
      this.setState({islogin:false,isregister:true})

    }

    componentDidMount() {
      document.body.style.background="linear-gradient(.25turn, gold, 10%, blue)";
      document.body.style.margin=0;
      document.body.style.padding=0;
      document.body.style.fontFamily="sans-serif";
      document.body.style.backgroundSize="cover";
      console.log(document.body.style)
    }
  
    componentWillUnmount() {
     
      document.body.style.background="null";
     
    }

    render() {
      const particlesoptions={
        particles:{
          number:{
            value:50,
            density:{
              enable:true,
              value_area:1000
            }

          },
          shape:{
            type:"image",
            stroke: {
              width: 3,
              color: "#B7046B",
            },
            polygon: {
              nb_sides: 3,
            },
        
            image:{
              src:srcimg,
              width:20,
              height:20
            }
          },
          size: {
            value: 30,
            random: true
        },
        

        }
      }
       return (
          <div>
            <div>
              <Particles 
                params={particlesoptions}/>
            </div>

              <div class="box-controller">
                <div class="controller" onClick={this.showLoginform}>
                  LOGIN
                </div>
                <div class="controller" onClick={this.showRegisterform}>
                  REGISTER
                </div>
                </div>
                <div class="box-container">
                 {this.state.islogin&&<LoginForm onSubmit={this.props.onSubmit} />}
                 {this.state.isregister&&<RegisterForm onSubmit={this.props.onSubmit} />}
                </div>

              
                </div>
                
             
           )
         }
        }
        
         export default UsernameForm