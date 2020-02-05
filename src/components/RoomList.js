import React from 'react'
import MessagePopup from './MessagePopup';


import ReactDOM from 'react-dom'
class RoomList extends React.Component {
    constructor(){
        super();
        this.state = {
            search:'',
            id :'',
            name:''
        }
        this.register=this.register.bind(this);
        this.updatestate=this.updatestate.bind(this);
        this.close_popup=this.close_popup.bind(this);
      
        }
        updatesearch(e){
            this.setState({
                search: e.target.value.substr(0,20)
            })
       

    }
    
    updatestate(e)
    {
        alert(e.target.name)
        this.setState({
            id: e.target.id,
            name:'@'+ e.target.name
        },()=>{
        alert(this.state.id),
        this.props.joinRoom(this.state.id),
        this.register()})

    }
    close_popup(){
         
        window.close_popup(this.state.name)
       }
  
      register (){
       
        
        window.preregister(this.state.name , this.state.name);
      
        ReactDOM.render(<MessagePopup 
          close_popup={this.close_popup}
          name={this.state.name}
          messages={this.props.messages}
          currentRoomId={this.props.currentRoomId}
          usersWhoAreTyping={this.props.usersWhoAreTyping }
          sendMessage={this.props.sendMessage}
          sendTypingEvent={this.props.sendTypingEvent}
         
        />, document.getElementById(this.state.name))
        window.register_popup(this.state.name , this.state.name)
    
      }
   

    render () {
       
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id);
        const dropnoname=orderedRooms.filter((room)=>{return room.name!==""});
        let filteredroom = dropnoname.filter((room)=>{return room.name.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1} );
        return (
            <div className="chat-sidebar">
   
                <h4>Your Galaxy</h4>
                <div className="room-search">
                     <input type="search" value={this.state.search}
                      onChange={this.updatesearch.bind(this)}>
                     
                      </input> 
                      <span className="search-span">
                      <i class="fa fa-search"></i>
                      </span>
                      </div>
                      <div className="sidebar-rooms">
                    {filteredroom.map((room, i) => {
                     
                        const active = this.props.currentRoomId === room.id ? 'active' : '';
                        
                        return (
                            
                            <div key={i} className="sidebar-rooms">
                               <div className="roomcontainer">
                               <div className="roomheader">
                                <a href='#'>
                                    #{room.name} 
                                </a>
                                </div>
                                 <div className="roominst">
                                   <a href="#" name={room.name} id={room.id} onClick={this.updatestate}>Join </a>
                                   <a href="#">Leave</a>
                                 </div>
                                 </div>
                               </div>

                        )      
                    })}
                    </div>
                </div>
            
        
        )
    }
}

export default RoomList