import React, { Component } from 'react'
import UsernameForm from './components/users'
import Chat from './chat'



export default class App extends Component {
  constructor()
  {
    super()
    this.state={
      currentscreen:'UsernameForm',
      currentUser: ''
      

    }
    this.onUsernameSubmitted=this.onUsernameSubmitted.bind(this)
    
  }
  onUsernameSubmitted(username){
    fetch('http://localhost:3001/users',{
      method:'POST',
      headers:{
                  'Content-Type':'application/json'
      },
      body:JSON.stringify({ username })
    }).then(response =>{
      this.setState({ currentUser : username ,
        currentscreen: 'chat'

      })
    }).catch(error=>{
      console.error(error)
    })
  }
  render() {
    if(this.state.currentscreen==='UsernameForm')
    {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
  }
  else if (this.state.currentscreen==='chat'){
    return <Chat currentUser={this.state.currentUser} />
  }
  }
}

