import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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


  const loginForm = () => (
    <div>
      <h2>Log in to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input  type="text"  value={username}  name="Username"  onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input  type="password"  value={password}  name="Password"  onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>      
    </div> 
  )


  const blogsList = () =>(     
      <div>
        <h2>blogs</h2>       
        <h3>{user.name}</h3>
        { blogs.map(blog =>< Blog key={blog.id} blog={blog} />)}
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