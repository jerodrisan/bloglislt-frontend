

const Form = ({handleLogin, onChangeUsername, onChangepassword, userName, password})=>{
    
    return(
        <div>
        <h2>Log in to Application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input  type="text"  value={userName}  name="Username"  onChange={onChangeUsername} />
          </div>
          <div>
            password <input  type="password"  value={password}  name="Password"  onChange={onChangepassword} />
          </div>
          <button type="submit">login</button>
        </form>      
      </div> 
    )  

}

export default Form;