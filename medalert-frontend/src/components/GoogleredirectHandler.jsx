import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "../token";

function RedirectGoogleAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("RedirectHandler mounted successfully");

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        console.log("QueryParams: ", window.location.search);

        if (accessToken) {
            console.log("AccessToken found: ", accessToken);
            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);
            navigate('/home')
        } else {
            console.log('No token found in URL');
            navigate('/home');
        }
    }, [navigate])

    return <div>Logging In.........</div>
}

export default RedirectGoogleAuth;