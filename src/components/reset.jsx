import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoLogin() {
  const history = useNavigate();
  


  const login = async (e) => {
    try {

      e.preventDefault();
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,

      },
        { withCredentials: true }

      );

      const { data } = response;
      console.log(data)
      if (data.user) {
        history("/app")
        window.localStorage.setItem("id", JSON.stringify(data.user._id))
        window.localStorage.setItem("username", JSON.stringify(data.user.username))
      }

    } catch (error) {
      console.log(error)

    }
  }



  return (
    <div className='back'>


     <h2>{errorMessage}</h2>
      <div className='outer-form'>
        <form onSubmit={login} >
          <h4>Reset Password</h4>

          <input type="password" className='input2' placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>

          <button>Reset Password</button>
        </form>
      </div>

    </div>
  )
}


