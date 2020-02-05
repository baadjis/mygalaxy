import React from 'react'
import ReactDOM from 'react-dom'
import ipfs from './ipfs'
export default class Poster extends React.Component{

constructor(){
    super();
    this.state={
      text:'',
      images:'',
      counter:0,

      postbackgroundcolor:null,
      posttextcolor:null

    }
    this.textcolor=this.textcolor.bind(this)
    this.changebackground=this.changebackground.bind(this)
    this.onchange=this.onchange.bind(this)
    this.addPost=this.addPost.bind(this)
    this.updateState=this.updateState.bind(this)
    this.edit=this.edit.bind(this)
    this.submit=this.submit.bind(this)
    this.fileuploadOnchange=this.fileuploadOnchange.bind(this)
}
onchange(e){
    this.setState({
        text:e.target.value
    })
    
}


edit(){
    
    
    window.CKEDITOR.replace('postbox');

}
updateState(){
    this.setState((prevState, props) => ({
        counter: prevState.counter + 1,
        text:'',
        images:''
    }),()=>{document.getElementById("postbox").value="";
            document.getElementById("postbox").style.background=null
            document.getElementById("postbox").style.color=null
})
    
    
}
submit(){
    var instance = window.CKEDITOR.instances.postbox;
    instance.updateElement();
    this.setState({
        text:instance.editable().getText()
    },()=>{this.addPost()})
}
fileuploadOnchange(){
var reader=new FileReader()
reader.addEventListener('load', ()=>{
    this.setState({
        images:reader.result
    })
})
reader.readAsDataURL(document.getElementById("fileuploader").files[0])

}
addPost(){
    
    if ((this.state.text!=="") || (this.state.images!=""))
    {
        
    let el= document.createElement("div")

    
    el.id="postergenesis"+this.state.counter
    const style={
        background:document.getElementById("postbox").style.background,
        color:document.getElementById("postbox").style.color,
        textAlign:document.getElementById("postbox").style.textAlign
    }
    
    
    var dom=document.createElement("DIV");
     dom.innerHTML=this.state.text;
     var plain_text=dom.textContent 
    var parent=document.getElementById("allposts")
    parent.insertBefore(el , parent.firstChild)
    ReactDOM.render(
        
        <div className="postergen">
        <div className="useravatardiv">
        <div className="useravatarimage"></div>
        <h3>{this.props.currentUser}</h3>
        </div>
        <div id="posttext" className="post-content">
             <div className="postonlytext" style={style}>
             {this.state.text} 
            </div>
            {this.state.images && <img src={this.state.images} className="postimage" />}<hr/>
        </div>
        <div className="appreciate">
            <a href="#"><i class="fa fa-star"></i>Star</a>
            <a href="#"><i class="fa fa-comment"></i>Comment</a>
            <a href="#"><i class="fa fa-share"></i>Repost</a>
            <a href="#"><i class="fa fa-thumbs-down"></i>Dislike</a>

        </div>
        </div>
        ,document.getElementById("postergenesis"+this.state.counter)
            ,async()=>{
                console.log(ipfs)
                const content=ipfs.Buffer.from(this.state.text)
                console.log(content)
                var results=await ipfs.add(content)
                var hash=results[0].hash
               var truly=await ipfs.cat(hash)
               console.log(truly.toString())
               this.updateState()
            }  
        
    )
    
    }
}
changebackground(e){

this.setState({
    postbackgroundcolor:e.target.value
},()=>{document.getElementById("postbox").style.background=this.state.postbackgroundcolor})
}
textcolor(e){

    this.setState({
        posttextcolor:e.target.value
    },()=>{document.getElementById("postbox").style.color=this.state.posttextcolor})
    }

    render()
    {
        return (
        <div className="post-container">
            
        <div className="post">
         <div id="column-1">
         <input type="file" className="uploadfile" id="fileuploader"  accept="file_extension|audio/*|video/*|image/*|media_type"  onChange={this.fileuploadOnchange}/>
         <input type="color" id="higlightcolor" title="background color" onChange={this.changebackground}/>
         <input type="color" id="textcolor" title="text color" onChange={this.textcolor}/>
          <hr/></div>
          <div id="postboxpos"><textarea  placeholder="say something don't be shy" name="postbox" id="postbox" type="text"  onChange={this.onchange}></textarea>
         <div id="postpos"><input type="submit" id="buttonpost" value="post"  onClick={this.addPost}/></div>
        
         </div>
        </div>
        <div className="allpost" id="allposts"></div>
        </div>
        
        )
    }
}