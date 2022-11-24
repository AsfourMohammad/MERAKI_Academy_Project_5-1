import axios from "axios"
import "./style.css"
import React, { useContext, useState, useEffect } from "react";
import {setLogin,setUserId} from "../../redux/reducer/auth"
import "./style.css";
import { useDispatch } from "react-redux";
import Navbar_b_token from "../Navbar_b_token/indes";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
 import { GoogleLogin } from 'react-google-login';
 import jwtDecode from "jwt-decode";
// import { GoogleLogout } from 'react-google-login';

// import { useGoogleLogin } from 'react-google-login'
import { current } from "@reduxjs/toolkit";

const Login = ()=>{
    const dispatch = useDispatch()
const navigate=useNavigate()
  

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [tokenGoogle,setTokenGoogle]=useState({})

  //===============================================================

  const login =  () => {
    axios.post("http://localhost:5000/login",{
        email,
        password
    })
  
    .then((result)=>{
        // dispatch(setLogin(result.data.token))
        // dispatch(setUserId(result.data.userId))
       
        setStatus(false)
        {if(result.data.userId==17){
            navigate("/admin")
        }else{
            navigate("/home")
        }
    }
        console.log(result) 
      

         {localStorage.setItem("firstName",result.data.firstName)}
         {localStorage.setItem("token",result.data.token)}
    

         {localStorage.setItem("userId",result.data.userId)}

    })
    .catch((err)=>{
        console.log(err)
        setMessage(err.response.data.message)
        setStatus(true)
        alert(err.response.data.message)
    })
  };
  const responseGoogle = (response) => {
    const result =response.profileObj;
    const token=response.tokenId;
    console.log(token,result);
    try{
        dispatch({type:"auth",data:{result,token}})
       navigate("/home")
    }catch(error){
        console.log(error);
    }
//console.log(response);
    
  }
  const onFailure=(err)=>{
console.log( 'onFailure response:',err);
  }
  
    return (
        <>
        <Navbar_b_token/>
        
        <div className="login_main">
            <p className="p">Login</p>
            <p>Please login below account detail</p>
            <label>Email</label>
            <input className="input" placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value)
            }}></input>
            <label>Password</label>
            <input className="input" placeholder="password" type={"password"} onChange={(e)=>{
                setPassword(e.target.value)
            }}></input>
           <GoogleLogin onClick={()=>{navigate('/home')}}
  clientId="994328639474-ub85dkgodp4vrm5nvfaemiklfko5jpt9.apps.googleusercontent.com"
  onSuccess={responseGoogle}
  onFailure={onFailure}
  cookiePolicy={'single_host_origin'}
  isSignedIn={false}
  accessType='offline'
  
  />
            {status&&<p className="message_response">{message}</p>}

            <button className="singIn" onClick={login}>Sign in</button>
            
        </div>
        <img className="image_login" src="https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=2000"></img>
        <div className="image_login3">
      <h1>Why should you log in?</h1>
      <p>You cannot start the browsing and purchasing process by first going through the login process for the ability to browse and purchase products and start the payment process.</p>
      <p>There is something about the saree that makes a woman look dignified, glorifying and every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its designer collection at competitive price and merchantable quality to its whole seller and worldwide online customer.</p>
      <p>In the event that you log in as a user, it will take you directly to the home page, but if it is an admin, it will take you directly to the admin page</p>
      </div>
        </>
    )
}
export default Login