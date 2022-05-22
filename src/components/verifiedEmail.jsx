import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export const VerifiedEmail = () => {
    const history = useNavigate();

    const { confirmToken } = useParams;


    const change = axios.get(`/verified-email/${confirmToken}`, {

    });

    if (change) {
        console.log("success")
        window.setTimeout(() => {
            history('/');
        }, 6000);
    } else {
        console.log("no data")
    }

    return (

        <div>
            <div>
                <h1>Verified User</h1>

            </div>

        </div>

    )

}