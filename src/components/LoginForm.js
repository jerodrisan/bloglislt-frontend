import PropTypes from 'prop-types'

const Form = ({handleLogin, onChangeUsername, onChangepassword, userName, password, notification, Notificacion})=>{  
    
  return(
    <div>       
        <div>         
          <h2>Log in to Application</h2>      
          <div className="wrapper-notif">{notification && Notificacion()}</div>   
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

Form.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangepassword: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
 
}

export default Form;