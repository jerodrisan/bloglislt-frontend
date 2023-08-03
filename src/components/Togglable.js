import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    //Usamos el hook useImperativeHandle para hacer la funcion toggleVisibility disponible fuera del componente !!!
    useImperativeHandle(refs, () => {
        return {
          toggleVisibility
        }
      })
    
    //Si queremos user un Togglable con su propiedad de props.children. En este caso children seria LoginForm 
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}  
          <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
        </div>
      </div>
    )
  }
  )
  
  export default Togglable;
