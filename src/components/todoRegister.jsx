import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoRegister() {
  const history = useNavigate();
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

//the backend is also structured to connect with the frontend using the localhost of the backend and axios
//withCredentials means
//history("/app") after signing redirect you to the application page
//username and setUsername state allow us to grab the user's name from that input field with the e.target.value
//same for the other input fields too

  const signup = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:8080/signup", {
        username,
        email,
        password,

      },
      { withCredentials: true }  
      );

      const { data } = response;
      console.log(data)
      if(data.user) {
        history("/app")
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }




  return (
    
      <div className='back'>

        <div className='outer-form'>
          <form onSubmit={signup}>
            <h4>SIGN IN</h4>
            <i class="fa fa-user"></i>
            <input type="text" className='input1' placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />

            <input type="email" className='input2' placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} />

            <input type="password" className='input2' placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />


            <input type="password" className='input2' placeholder=" Confirm Password" />
            <p> Been here before? <NavLink to="/">LogIn</NavLink></p>

            <button type='submit' disabled={ !email || !password } onClick={ signup }>Sign In</button>

          </form>
        </div>


 </div>
    
  )
}


