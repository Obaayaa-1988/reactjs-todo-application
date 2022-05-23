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
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");





  const change = async (e) => {
    if (newPassword !== confirmPassword) {
      return setError1("password don\'t match");

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
      setError3("something happened");

      if (error.message.includes('401')) {
        setError(' cant use old password')
      }

      if (error.message.includes('400')) {
        setError2(' wrong credentials')
      }

      // if (error.response.status === 400) {
      //   return setError(error.response.data.msg)

      // }
      // if (error.response.status === 401) {
      //   return setError(error.response.data.msg)

      // }
    }
  };

  return success ? (
    <div className="ground">
      <h1>password successfully changed</h1>
      {/* <h2>login with new password</h2> */}

    </div>
  ) : (
    <div className='back'>
      <div className='outer-form'>

        {error && <div style={{ color: "white", marginLeft: "2rem" }}>{error3}</div>}

        <form onSubmit={change} >
          <h4>Reset Password</h4>

          <i class="fa fa-user"></i>

          <input type="password" className='input2' placeholder="Old Password" value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)} />
            <span style={{ color: "red", marginLeft: "3rem" }}>{error2}</span>




          <input type="password" className='input2' placeholder=" New Password" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />

          <span style={{ color: "red", marginLeft: "3rem" }}>{error}</span>




          <input type="password" className='input2' placeholder=" Confirm Password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <span style={{ color: "red", marginLeft: "3rem" }}>{error1}</span>




          <button type='submit' >reset password</button>
        </form>
      </div>
    </div>
  )
}