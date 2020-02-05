import React from 'react'
const NewRoomForm =({ submit }) => (
  <form
    className="new-room-form"
    onSubmit={e => {
      e.preventDefault()
      submit({
        name: e.target[0].value,
        private: e.target.elements[2].checked,
      })
      e.target[0].value = ''
    }}
  >
   <input
         type="text" 
                  placeholder="Create a new room" 
                      required />
                   <button>
                        <input type="checkbox" />
                        <span><i class="fa fa-lock"></i></span>
                        </button>
                        <button type="submit">
                                     <i class="fa fa-plus">Add</i>
                           </button>
                                  
                                     
   
          </form>
      
      )
  
  
export default class Roomsetting extends React.Component {
  render(){
    return(
      <div>
        <span>
        <i class="fa fa-user-plus"></i>
        </span>
      </div>
    )
  }
 }
 

