import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoLogin() {
  const history = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [ errorMessage, setErrorMessage] = useState("")


  const login = async (e) => {
    try {
      if (!email || !password) {
        setEmailError('email is required')
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
      console.log(data.user)
      if (data.user) {
        history("/app")
        window.localStorage.setItem("id", JSON.stringify(data.user))
        // window.localStorage.setItem("username", JSON.stringify(data.user.username))
      }

    } catch (error) {
      console.log(error)

      if(error.message.includes('401')){
        setErrorMessage('email doesnt exist')
      }



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
          <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>

          {
            !password && (
              <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>
            )
          }


          <p> Don't have an account? <NavLink to="/todoRegister">SignUp</NavLink></p>

          <button type='submit' onClick={login}>LogIn</button>
          


        </form>
      </div>



    </div>
  )
}


