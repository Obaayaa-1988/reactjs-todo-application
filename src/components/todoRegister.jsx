import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoRegister() {
  const history = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("")
  const [errorMessage1, setErrorMessage1] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [success, setSuccess] = useState("");



  //the backend is also structured to connect with the frontend using the localhost of the backend and axios
  //withCredentials means
  //history("/app") after signing redirect you to the application page
  //username and setUsername state allow us to grab the user's name from that input field with the e.target.value
  //same for the other input fields too

  const signup = async (e) => {
    try {
      e.preventDefault();
      if (email === '') {
        setEmailError("please enter your email")
      } else if (password === '') {
        setPasswordError('please enter your password')

      } else if (confirmPassword === "") {
        setError('please confirm your password')
      } else {
        console.log("signUp")
      }

      const response = await axios.post("http://localhost:8080/signup", {
        username,
        email,
        password,

      },
        { withCredentials: true }
      );

      const { data } = response;
      console.log(data)

      // if(data === "Please enter an email"){
      //   setEmailError(data)
      // }

      //  if(data === "Please enter an email"){
      //    setErrorMessage(data)
      //  }

      //  if(data === "Please enter a password"){
      //   setPasswordError(data)
      // }

      if (data) {
        setSuccess(data.message)
      //   window.setTimeout(() => {
      //     history('/');
      // }, 6000); 
        
      }

    } catch (error) {
      console.log(error)

      if (error.message.includes('409')) {
        setErrorMessage1('email already exist please login')
      }

      // if (error.message.includes('400')) {
      //   setErrorMessage(' email required')
      // }

      // if (error.message.includes('409')) {
      //   setPasswordError(' password required')
      // }

    }
  }

  return  (
   <div className='back'>
    
      <div className='outer-form'>
      { success ? <div style={{ color: "white", marginLeft: "3rem" }}>{success}</div> : null}
        <form onSubmit={signup}>
          <h4>SIGN IN</h4>
          {/* <i class="fa fa-user"></i> */}
          <input type="text" className='input1' placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input type="email" className='input2' placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
          {
            !email && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{emailError}</span>
            )
          }
          <span style={{ color: "red", marginLeft: "3rem" }}>{errorMessage1}</span>



          <input type="password" className='input2' placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>


          {
            !password && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>

            )
          }
          <input type="password" className='input2' placeholder=" Confirm Password" value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          {
            !confirmPassword && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{error}</span>

            )
          }

          {/* <p> Been here before? <NavLink to="/">LogIn</NavLink></p> */}

          <button type='submit' onClick={signup}>Sign In</button>

        </form>
      </div>


    </div>


  )
}


