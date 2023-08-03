
import { useState } from "react"

const Blog = ({blog, username}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  
  const blogDeteiled =() =>{  
     return(
    <div>       
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>likes</button></div>
        <div>{username}</div>
    </div>
     )
  }  

  return(
       
       <div style={blogStyle}>
          <div>{blog.title} by {blog.author} <button onClick={()=>setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
          {visible ? blogDeteiled() :null}           
      </div>
    
      
  )
}
 


export default Blog