
import { useState } from "react"
import BlogService from "../services/blogs"

const Blog = ({blog, username,  removeBlog}) => {

  const [blogupdated, setBlogupdated] =useState(blog)
  const [visible, setVisible] = useState(true)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleLikes = async (id) => {    
    const blogUpdated = await BlogService.updateBlogLikes(id)    
    setBlogupdated(blogUpdated)
  } 

   
  const blogDeteiled =() =>{  
     return(
    <div>       
        <div>{blog.url}</div>
        <div>likes {blogupdated.likes} <button onClick={()=>handleLikes(blog.id)}>likes</button></div>
        <div>{username}</div>
        <button style={{backgroundColor:"blue", color:"white"}} onClick={()=>removeBlog(blog.id, blog.user, blog.title)}> remove </button>
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