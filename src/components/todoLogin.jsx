import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoLogin() {
  const history = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [error, setError] = useState("");


  const login = async (e) => {
    try {
      if (email === '') {
        return setEmailError('email is required')
      }

      if (password === '') {
        return setPasswordError('password required')
      }


      e.preventDefault();
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,

      },
        { withCredentials: true }

      );

      const { data } = response;
      console.log(data)

       if(data.response = "Email or password doesn\'t exist please sign up"){
         setError('Email or password doesn\'t exist please sign up')
       }

      console.log(data.user)
      if (data.user) {
        history("/app")
        window.localStorage.setItem("id", JSON.stringify(data.user))
        // window.localStorage.setItem("username", JSON.stringify(data.user.username))
      }

    } catch (error) {
      console.log(error)
      // if (error.message.includes("401")) {
      //   setError("Email or password does not exist");
      // }



    }
  }
  return (
    <div className='back'>
      <h2>{errorMessage}</h2>
      <div className='outer-form'>
        <form onSubmit={login} >
          <h4>LOG IN</h4>

          <i class="fa fa-user"></i>

          <input type="email" className='input2' placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />

          {
            !email && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{emailError}</span>
            )
          }

        
          <input type="password" className='input2' placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />

          {
            !password && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>
            )
          }

          <span style={{ color: "red", marginLeft: "3rem" }}>{error}</span>


          <p> Don't have an account? <NavLink to="/todoRegister">SignUp</NavLink></p>
          <p>  <NavLink to="/forgotPassword">Forgot Password?</NavLink></p>


          <button type='submit' onClick={login}>LogIn</button>

        </form>
      </div>
    </div>
  )
}


