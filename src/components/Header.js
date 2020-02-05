import React from 'react'
export default class Header extends React.Component{
    constructor(){
        super();
        this.state={
       name:'',
       roomformOpen:false,
       private:false
        }
     this.onSubmit=this.onSubmit.bind(this)
     this.onChange=this.onChange.bind(this)
     this.onNewroomClick=this.onNewroomClick.bind(this)
    }
    onChange(e){
      this.setState({
         [e.target.name]:e.target.value
      })
    }
    onNewroomClick(){
       if(!this.state.roomformOpen){
           document.getElementById("arrow-up").style.display="block";
           document.getElementById("room-form").style.display="block";
           
           this.setState({roomformOpen:true});

       }
       else{
        document.getElementById("arrow-up").style.display="none";
        document.getElementById("room-form").style.display="none";
        
        this.setState({roomformOpen:false});
       }

    }
    onSubmit(e){
        e.preventDefault()
        this.props.submit({
            name:this.state.name,
            private:this.state.private
        })
        document.getElementById("arrow-up").style.display="none";
        document.getElementById("room-form").style.display="none";
        this.setState({roomformOpen:false})
    }
  render(){ 
      
      return (
        <header className="header">
            <div className="logo">
             <span><i class="fa fa-connectdevelop">Yas!</i></span>
            
            </div>
            <nav className="nav">
             
                   
                <ul>
                
                    <li className="nav-search-input">
                    <input type="search" className="nav-search" placeholder="search"></input>
                    <span><i class="fa fa-search"></i></span>
                    </li>
                
                    <li class="dropdown" id="creatmenu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Create
                    <b class="caret"></b>
                   </a>
                    <ul class="dropdown-menu" role="menu">
                    <li> 
                    
                        <a href="#"><i class="fa fa-calendar" aria-hidden="true" title="Events"></i> Events</a>
                        
                    </li>
                   <li>
                       <hr/>
                       <a href="#"> Funding</a>
                       
                       </li>
                   <li>
                   <hr/>
                       <a href="#">payment chanel</a></li>
                   <li>
                   <hr/>
                       <a href="#"> <i class="fa fa-shopping-cart"></i>D-shop</a>
                       
                      
                       </li>
                     
                   <li>
                   <hr/>
                           <a href="#">Auction</a>
                       </li>

                       </ul>
                       </li>
                       <li>
                           <div className="newroom-form">
                           <a href="#" onClick={this.onNewroomClick}><i class="fa fa-plus">new room</i></a>
                           </div>
                           <div class="arrow-up" id="arrow-up"></div>
                       </li>
                     <div className="room-form" id="room-form">
                     <form onSubmit={this.onSubmit}>
                     <div>
                     <label>name</label>
                     <input
                              type="text" 
                             placeholder="Create a new room" name="name"
                             value={this.state.name}
                         onChange={this.onChange} required />
                          </div>
                               <button>
                        <input type="checkbox" name="private" onChange={this.onChange} value={this.state.private}/>
                        <span className="Add-span">
                         <i class="fa fa-lock"></i>private
                         </span>
                         
                        </button>
                        <button type="submit" onClick>Add
                                     
                           </button>
                                  
                     </form>

                     </div>
                </ul>
               
            </nav>
            <nav className ="nav1">
            <ul> <li>
                <i class="fa fa-user-circle" title="user"></i>
                <a href="#">{this.props.currentUser}</a>
                    </li>  
                    <li>
                    <i class="fa fa-bell" title="notifications"></i>
                    <a href="#" title="notifications"></a>
                    </li> 
                    <li>
                    <i class="fa fa-users" title="groups"></i>
                    <a href="#" title="groups"></a>
                    </li>
                    <li>
                    <i class="fa fa-power-off" title="logout"></i> 
                    <a href="#" title="logout"></a>
                    </li>
                    </ul>
            </nav>
        </header>
    );
  }
}