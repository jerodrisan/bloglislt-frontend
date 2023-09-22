
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'



const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)   
  const [notification, setNotification] = useState(null)
  const createFormRef = useRef()
  
 


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
          blogs.sort((a,b)=> b.likes-a.likes)  //ordenamos por likes          
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
      //const blogs =  blogService.getUserBlogs(user.userid)   
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
  

    //Borramos blog cuando pulsamos el boton remove
    const removeBlog =  async (id, userid, title) => {

     let confirmar = window.confirm(`Do you wnat to delete the following blog ? \n${title}` )
     if (confirmar){
      await blogService.removeBlog(id)  //no devolvera nada el backend      
      const blogsdeleted = await blogService.getUserBlogs(userid) //una vez borrado, actualizamos los blogs            
      setBlogs(blogsdeleted)   
     }
  }
    
  const handleCreateBlog = async ({title, author, url}) =>{    
    try{
      const newBlog = await blogService.create({
        title, author, url
      })
      createFormRef.current.toggleVisibility()  //Pillamos la visibilidad del componente dentro de togglable para ocultar cuando creamos una nueva nota 
      console.log(newBlog)      
      const allblogs = blogs.concat(newBlog)      
      setBlogs(allblogs)      
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
  

  const Notificacion = () => (                  
    <div >     
      <Notification notification={notification} />    
    </div>     
  )
    


  const loginForm = () => (
    //Hacemos uso de un Togglable que no es selfclosed con lo cual su propiedad props.children no es un array vacio sino que children seria LoginForm
    <Togglable buttonLabel= 'Reveal Login form' buttonLabel2='Hide Login form'>
        <LoginForm handleLogin = {handleLogin} onChangeUsername ={onChangeUserName} onChangepassword = {onChangePassword}
            userName ={username} password={password} notification={notification} Notificacion={Notificacion}/>       
    </Togglable>
  )

   
  

  const blogsList = () =>(      
    <div>        
      <h1>Blogs</h1>      
      <div  className="wrapper-notif">{notification && Notificacion()} </div>
       <span>User {user.name} , you are logged in</span>  <button onClick={logout}>logout</button>   
      <Togglable buttonLabel={'Reveal Create form '} buttonLabel2='Hide Create form'  ref={createFormRef}>
        <CreateForm createBlog={handleCreateBlog} />
      </Togglable>  
       {blogs.map(blog =>< Blog key={blog.id} blog={blog} username = {user.name}  removeBlog={removeBlog}
       />) } 
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