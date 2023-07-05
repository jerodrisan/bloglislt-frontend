import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
        }else{
          
          

          /*
          const response = await axios.get('http://localhost:3003/api/blogs')
          const blogs = response.data
          console.log(blogs)
          setBlogs( blogs )
          */

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
      //console.log(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      //console.log(exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    }
  }

  const handleCreate =  (event) => {
    event.preventDefault()

  }

  const logout = (event) =>{   
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
  } 


  const onChangeUserName = ({target}) => setUsername(target.value)
  const onChangePassword =({target}) => setPassword(target.value) 
  const onChangeTitle = ({target}) => setTitle(target.value)
  const onChangeAuthor = ({target}) => setAuthor(target.value)    
  const onChangeUrl = ({target}) => setUrl(target.value)  

  const loginForm = () => (
    <LoginForm handleLogin = {handleLogin} onChangeUsername ={onChangeUserName} onChangepassword = {onChangePassword}
    userName ={username} password={password} 
    />     
) 
  


  const blogsList = () =>(     
      <div>
        <h1>Blogs</h1>
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