import React, { useRef } from "react";

import CancelIcon from '@mui/icons-material/Cancel';
import MapIcon from '@mui/icons-material/Map';
import "./Login.css"
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const userLoggedInSuccess = () => {
  toast.success("login successfully")
}

const userLoggedInFail = () => {
  toast.success("login failed")
}

const Login = ({setShowLogin, setCurrentUser}) => { 
  
  const nameRef = useRef()
  const passRef = useRef()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const newUser = {
      userName : nameRef.current.value,
      password : passRef.current.value
    } 
try {
  //get a success notification
  const responce = await axios.post("/users/login", newUser)
  userLoggedInSuccess()

  console.log(responce)
  setCurrentUser(responce.data.userName)
  setShowLogin(false)

} catch (err) {
  //get a failed notification
  userLoggedInFail ()
  console.log(err)
}
  }

  return (
    <div className='login_container'>
      <div className='application'>
        Log to your world
        <MapIcon />
        </div>
      <form onSubmit={handleSubmit} >
        <input  type="text" placeholder="Username" ref={nameRef} />
        <input type="password" placeholder="Password" ref={passRef} />
        <button className="login_button">Login</button>
      </form>
      <CancelIcon className="login_cancel" onClick={()=> setShowLogin(false)}/>
    </div>
  )
}

export default Login
