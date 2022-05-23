import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export const VerifiedEmail = () => {
    const { confirmToken } = useParams;

    const history = useNavigate();

    const verified = axios.get(`/verified-email/${confirmToken}`, {

    });

    if (verified) {
        console.log("success")

        window.setTimeout(() => {
            history('/');
        }, 6000);
    } else {
        console.log("no details")
    }

    return (
        <div>
            <div className="ground" >
                <h1>Verified User You Can Now Log In</h1>

            </div>

        </div>

    )

}