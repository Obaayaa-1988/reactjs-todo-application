import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export default function TodoLogin() {
  const history = useNavigate();
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

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
      if(data.user) {
        history("/app")
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }



  return (
    <div className='back'>
         {/* <nav className='minibar'>
        <Link to="/">Todo</Link> {''}
        <Link to="/todoRegister">TodoRegister</Link>
        </nav>
       <Outlet /> */}


        <div className='outer-form'>
          <form onSubmit={login} >
            <h4>LOG IN</h4>

            <i class="fa fa-user"></i>
            <input type="email" className='input2' placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}  />

            <input type="password" className='input2' placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} />

            <p> Don't have an account? <NavLink to="/todoRegister">SignUp</NavLink></p>

            {/* <textarea placeholder='write your message' rows={5} cols={35}></textarea> */}
            <button type='submit' disabled={ !email || !password } onClick={ login }>LogIn</button>

          </form>
        </div>



    </div>
  )
}


