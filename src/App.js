
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'



const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  /*
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  */

   useEffect(() => {
     async function fetchData(){
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')     
      if (loggedUserJSON) {       
        const user = JSON.parse(loggedUserJSON)       
        console.log(user)
        const result =  await loginService.checkToken(user.token)        
        if(result.error==='TokenExpiredError'){
          console.log('sesion caducada')  //en caso de que pongamos el token en el back expire pronto 
          setUser(null)
          setBlogs([])
        }else{          
          const blogs = await blogService.getUserBlogs(user.userid)       
          setBlogs( blogs ) 
          setUser(user)
          blogService.setToken(user.token)
        } 
      }       
    }
    fetchData()
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()    
    try {
      const user = await loginService.login({
        username, password,
      })
      //guardamos el user en local storage en forma de string 
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      console.log('usuario', user.token)     
      blogService.setToken(user.token)
      const blogs = await blogService.getUserBlogs(user.userid)       
      setUser(user)
      setBlogs( blogs )       
      setUsername('')
      setPassword('')
    }catch (data_error) {      
      const error = data_error.response.data //{error: 'wrong username or password'}
     // console.log(data_error)
     notificationPopUp(error.error)
     setUsername('')
     setPassword('')  
    }
  }
  

  const handleCreate =  async (event) => {   
    event.preventDefault()
    try{
      const newBlog = await blogService.create({
        title, author, url
      })
      console.log(newBlog)      
      const allblogs = blogs.concat(newBlog)      
      setBlogs(allblogs)     
      setTitle('')
      setAuthor('')
      setUrl('')
      const notificacion = `a new blog ${newBlog.title} by ${newBlog.author} added`    
      notificationPopUp(notificacion)
    }catch(error){
        console.log(error)
    }
  }


  const notificationPopUp = (message) =>{
    setNotification(message)     
    setTimeout(() => {
      setNotification(null)
    },3000)        
  }

  const logout = (event) =>{   
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      setNotification(null)
      setUser(null)
      setBlogs([])
  } 


  const onChangeUserName = ({target}) => setUsername(target.value)
  const onChangePassword =({target}) => setPassword(target.value) 
  const onChangeTitle = ({target}) => setTitle(target.value)
  const onChangeAuthor = ({target}) => setAuthor(target.value)    
  const onChangeUrl = ({target}) => setUrl(target.value)  


  const Notificacion = () => (                  
    <div >     
      <Notification notification={notification} />    
    </div>     
  )

    

  
  const loginForm = () => {

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return(
    <div>       
      <div style={hideWhenVisible}>
          <button onClick={()=>setLoginVisible(true)}> Log in </button>
      </div>
      <div  style={showWhenVisible}>       
          <h2>Log in to Application</h2>      
          <div className="wrapper-notif">{notification && Notificacion()}</div>   
          <LoginForm handleLogin = {handleLogin} onChangeUsername ={onChangeUserName} onChangepassword = {onChangePassword}
            userName ={username} password={password}/>   
          <button onClick={()=>setLoginVisible(false)}>cancel</button>              
      </div>
    </div>
  )  
  } 
 


  const blogsList = () =>(           
      <div>        
        <h1>Blogs</h1>      
        <div  className="wrapper-notif">{notification && Notificacion()}     </div>
        <span>User {user.name} , you are logged in</span>  <button onClick={logout}>logout</button>   
        <CreateForm onHandleCreate={handleCreate} title={title} author={author} url={url}
                    onChangeTitle = {onChangeTitle} onChangeAuthor={onChangeAuthor} onChangeUrl={onChangeUrl}
                    />
        {blogs.map(blog =>< Blog key={blog.id} blog={blog} />)}
      </div>        
  )

  return (
    <div>          
      {user === null && loginForm()}
      {user !== null && blogsList()}
    </div>
  )
 
}

export default App