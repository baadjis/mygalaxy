import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { UserHeader } from './components/Userheader'
import  Header from './components/Header'
import MessagePopup from './components/MessagePopup'
import ReactDOM from 'react-dom'
import Asidenav from './components/Asidenav'
import Poster from './components/Poster'
import Datastorage from './components/Datastorage'
import "./index.css"

export default class Chat extends React.Component { 
    constructor(props){
    
        super(props)
        this.state={
            messages:[],
            currentRoomId: '',
           // currentUser: {},
            usersWhoAreTyping: [],
            joinableRooms: [],
            joinedRooms: [],
            screen:"Main",
            
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms=this.getRooms.bind(this)
        this.joinRoom=this.joinRoom.bind(this)
        this.createdirectChanel=this.createdirectChanel.bind(this)
        this.renderDatastorage=this.renderDatastorage.bind(this)
        
        
       
    }
    sendTypingEvent() {
            if(this.state.currentRoomId){
            this.currentUser
              .isTypingIn({ roomId: this.state.currentRoomId })
             .catch(error => console.error('error', error))
            }
            else {
                alert(" you must subcribe to a room before you start typing")
            }
         }
     sendMessage(text){
            this.currentUser.sendMessage({
                text,
                roomId:this.state.currentRoomId
                
    
            })
        }
        
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager ({
            instanceLocator: 'v1:us1:b61a63ab-2a30-4a4e-b25e-02af5d77ca04',
            userId : this.props.currentUser,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b61a63ab-2a30-4a4e-b25e-02af5d77ca04/token'
            })
        })

        chatManager.connect({
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
            onUserCamonline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate()
            
        })
        .then(currentUser => {
            this.currentUser = currentUser
            this.getRooms()
          
        })
        .catch(err => console.log('error on connecting: ', err))
        window.addEventListener("resize", this.calculate_popups),
        window.addEventListener("load", this.calculate_popups);
      

    }
         
    createRoom(options)
    {
    this.currentUser.createRoom(options)
    .then(
        room =>
            this.joinRoom(room.id),
            )
    .catch(err =>console.error(err))
        


    }
   
    subscribeToRoom(roomID) {
        
       this.setState({ messages: [] }) //added this line to clean up the state
        !this.currentUser.roomSubscriptions[roomID] &&
        this.currentUser.subscribeToRoom({
            roomId: roomID,
            messageLimit: 100,
            hooks:{
                onMessage: message => {
                this.setState({
                    messages:[...this.state.messages , message]
                })
            },
            onUserStartedTyping: user => {
                             this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                         })
                       },
            onUserStoppedTyping: user => {
                         this.setState({
                          usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                              username => username !== user.name)

            })
        },
        onPresenceChange: () => this.forceUpdate(),
        onUserJoined: () => this.forceUpdate(),
        onUserCamonline: () => this.forceUpdate(),
        onUserWentOffline: () => this.forceUpdate()
    }
    

 })
 .then(currentRoom => {
    this.setState({ currentRoomId: currentRoom.id })
    this.getRooms()
    
})
.catch(err => console.log('error on subscribing: ', err))
}
    
getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
        })
    })
    .catch(err => console.log('error on joinableRooms: ', err))
}
joinRoom(roomID){
    
    this.setState({
        currentRoomId:roomID
    }),
    this.subscribeToRoom(roomID)
    this.state.messages[roomID] &&
      this.setCursor(
        roomID,
        Object.keys(this.state.messages[roomID]).pop()
      )
    
      
  }

  setCursor(roomId, position) {
  this.currentUser
    .setReadCursor({ roomId, position: parseInt(position) })
    .then(x => this.forceUpdate())
  }
//create direct conversation channel
  createdirectChanel(options){
    if (options.user !== this.currentUser) {
      const exists = this.currentUser.rooms.find(
        x =>
          x=== options.user + this.state.currentUser ||
          x=== this.currentUser + options.user
      )
      exists
        ? this.joinRoom(exists)
        : this.createRoom({
            name: this.currentUser + options.user,
            addUserIds: [options.user],
            private: true,
          })
    }
  }// rendering Main views
  renderDatastorage(){
      this.setState({
          screen:"Datastorage"
      })
  }
      
    render(){  
        if (this.state.screen==="Main")
        {
        return (
            <div>
                  <Header currentUser= {this.props.currentUser} submit={this.createRoom}/>
                  <Asidenav currentUser= {this.props.currentUser} 
                  renderDatastorage={this.renderDatastorage}
                  />
                  
                  <RoomList
                    currentUser={this.props.currentUser}
                    currentRoomId={this.state.currentRoomId} 
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
                    joinRoom={this.joinRoom}
                    messages={this.state.messages}
                    usersWhoAreTyping={this.state.usersWhoAreTyping }
                    sendMessage={this.sendMessage}
                    sendTypingEvent={this.sendTypingEvent} />
                   <Poster currentUser={this.props.currentUser} />
                   }
              
                 
            
            
          </div>
        )}
        else if(this.state.screen==="Datastorage")

        {
        return(
                <div>
                    <Datastorage />
                </div>
        )
        }
    }
    }