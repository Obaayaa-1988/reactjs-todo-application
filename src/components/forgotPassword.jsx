import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ForgotPassword = () => {
    const history = useNavigate();

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


    const change = async (e) => {
        try {

            e.preventDefault();
            await axios.put(`/forgot-password/${email}`, {

            });

            setSuccess(true)

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
                    <h4>Forgot Password</h4>
                    <p style={{ color: "white" }}>Please enter your email and we will send you the a reset link</p>

                    <input type="email" className='input2' placeholder="someone@gmail.com" value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <button type='submit' >Send Link</button>
                </form>
            </div>



        </div>

    )

}