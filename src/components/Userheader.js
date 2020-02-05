import React from 'react'


export class UserHeader extends React.Component{
  
    render(){
      
const placeholder =
'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

        return(
          
  <header className="user-header">
   {/*<img src={this.props.user.avatarURL || placeholder} alt={this.props.user.name} />*/}
    <div>
      <h3>{this.props.user}</h3>
      <h5>{this.props.user && `@${this.props.user}`}</h5>
    </div>
  </header>)
}}