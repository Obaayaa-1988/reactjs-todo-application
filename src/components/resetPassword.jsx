import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ResetPassword = () => {
  const history = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  const change = async (e) => {
   if(newPassword !== confirmPassword){
     return setError("password don\'t match");
  
   }
     
    try {

      e.preventDefault();
      await axios.post('/reset', {
        password: oldPassword,
        newPassword
      });

      setSuccess(true)

      setTimeout(() => {
        history('/');
      }, 6000);

    } catch (error) {
      console.log(error.response);
      setError("something happened");
      if( error.response.status === 400){
        return setError(error.response.data.msg)

      }
      if( error.response.status === 401){
        return setError(error.response.data.msg)

      }
    }
  };

  return success ? (
    <div>
      <h1>password successfully changed</h1>
      <h2>login with new password</h2>

    </div>
  ) : (
    <div className='back'>
      <div className='outer-form'>

        {error && <div>{error}</div>}

        <form  onSubmit={change} >
          <h4>Reset Password</h4>

          <i class="fa fa-user"></i>

          <input type="password" className='input2' placeholder="Old Password" value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} />
  

          <input type="password" className='input2' placeholder=" New Password" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />


          <input type="password" className='input2' placeholder=" Confirm Password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />

          <span style={{ color: "red", marginLeft: "3rem" }}>{error}</span>

          <button type='submit' >reset password</button>
        </form>
      </div>
    </div>
  )}