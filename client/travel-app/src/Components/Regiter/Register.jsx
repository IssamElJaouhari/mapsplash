import React, { useRef } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import "./Register.css"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";


const userRegisterSuccess = () => {
  toast.success("Registred succesfully")
}

const userRegisterFail = () => {
  toast.error("failed to Registre ")
}

const Register = ({ setShowRegister }) => {

  const nameRef = useRef()
  const emailRef = useRef()
  const passRef = useRef()
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const newUser = {
      userName : nameRef.current.value,
      email : emailRef.current.value,
      password : passRef.current.value,
    }
    try {
      const responce = await axios.post("/users/register", newUser)
      console.log(responce)

      userRegisterSuccess()
      setShowRegister(false )
    } catch (err) {
      userRegisterFail()
      console.log(err)
    }
  }
  return (
    <div className="register_container">
      <div className="application">
        <ExitToAppIcon />
        Create account
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password" ref={passRef}/>
        <button className="register_button">Register</button>
      </form>
      <CancelIcon  className="register_cancel" onClick = {() => setShowRegister(false)}/>
    </div>
  );
};

export default Register;
