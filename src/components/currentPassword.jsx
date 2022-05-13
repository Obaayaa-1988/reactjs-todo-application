import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export const CurrentPassword = () => {
    const history = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { resetToken } = useParams;


    const change = async (e) => {
        try {

            e.preventDefault();
            await axios.put(`/${resetToken}/reset-password`, {
                newPassword

            });

            setSuccess(true)

            window.setTimeout(() => {
                history('/');
              }, 6000);
        


        } catch (error) {
            console.log(error);
            setError("something happened");

        }
    };

    return success ? (
        <div >
            <h1> success</h1>
            <h2>please check email for password reset link</h2>

        </div>
    ) : (
        <div className='back'>
            <div className='outer-form'>
                {error && <div>{error}
                </div>}
                <form onSubmit={change} >
                    <h4>Add A New Password</h4>
                    <p style={{ color: "white" }}>Please enter your email and we will send you the a reset link</p>

                    <input type="password" className='input2' placeholder=" New Password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />

                    <input type="password" className='input2' placeholder=" Confirm New Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button type='submit' >Send</button>



                </form>
            </div>



        </div>

    )

}