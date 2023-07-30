

const Form = ({handleLogin, onChangeUsername, onChangepassword, userName, password})=>{
  
    
  return(
    <div>       
        <div>         
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


    </div>
     
  )  

}

export default Form;