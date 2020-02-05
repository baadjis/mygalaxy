import React, { Component } from 'react'

class WhosOnlineList extends Component {
 renderUsers() {
   return (
    <div className="user-online">
     <ul>
       {this.props.users.map((user, index) => {
         if (user === this.props.currentUser) {
           return (
             <WhosOnlineListItem key={index} presenceState="online">
              {user} (You)            
               </WhosOnlineListItem>
                 
           )
         
         }
         return (
           <WhosOnlineListItem key={index} presenceState={user.presence.state}>
             {user}
          </WhosOnlineListItem>
         )
      })}
    </ul>
    </div>
  )
  }

 render() {
   if (this.props.users) {
     return this.renderUsers()
   } else {
     return <p>Loading...</p>
   }
 }
}
class WhosOnlineListItem extends Component {
 render() {
  
  return (
   
    <li >
        {this.props.children}
      </li>
      
    )
  }
}

export default WhosOnlineList