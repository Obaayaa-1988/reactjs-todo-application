import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export const CurrentPassword = () => {
    const history = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");

    const [passwordError, setPassworError] = useState("");


    const { resetToken } = useParams;


    const change = async (e) => {


        try {
            if (newPassword === "") {
                setPassworError("new password required")
            } else if (confirmPassword === "") {
                setError1("confirm password required")

            }

            else if (confirmPassword !== newPassword) {
                setError("passwords dont match")

            }

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
        <div  className="ground">
            <h1> {success}</h1>
            <h2>please check email for password reset link</h2>

        </div>
    ) : (
        <div className='back'>
            <div className='outer-form'>
                {error && <div>{error}
                </div>}
                <form onSubmit={change} >
                    <h4>Add A New Password</h4>
                    <p style={{ color: "white" }}>Enter Your New Password</p>

                    <input type="password" className='input2' placeholder=" New Password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                    <span style={{ color: "red", marginLeft: "3rem" }}>{passwordError}</span>

                    <input type="password" className='input2' placeholder=" Confirm New Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span style={{ color: "red", marginLeft: "3rem" }}>{error1}</span>

                    <span style={{ color: "red", marginLeft: "3rem" }}>{error}</span>


                    <button type='submit' >Send</button>

                </form>
            </div>



        </div>

    )

}