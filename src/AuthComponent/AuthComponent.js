import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import BiddingPortal from "../BiddingPortal/BiddingPortal";
import axios from "axios";
import Cookies from "universal-cookie";
import './AuthComponent.css'
import Header from "../HeaderComponent/Header";

// get token generated on login

export default function AuthComponent() {
    // set an initial state for the message we will receive after the API call
    const [message, setMessage] = useState("");
    const location = useLocation();
    const cookies = new Cookies();
    const token = location.state.token ?? cookies.get("TOKEN");

    // useEffect automatically executes once the page is fully loaded
    useEffect(() => {
        if (!token) return
        // set configurations for the API call here

        // make the API call
        axios({
            method: "get",
            url: process.env.REACT_APP_HOSTURL + "/auth-endpoint",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((result) => {
            // assign the message in our result to the message we initialized above
            setMessage(result.data.message);
        }).catch((error) => {
            error = new Error();
        });
    }, [token]);

    // logout
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }

    return (
        <>
        {/* <Header/> */}
        <div className="text-center" >
            {/* <h2>Bidding Portal</h2>
            <h3 className="text-success">{message}</h3> */}
            {/* logout */}

            <BiddingPortal />
            {/* <button class='button-89' id='buttonLogout' type="submit" variant="danger" onClick={() => logout()}>
                Logout
            </button> */}
        </div>
        </>
    );
}
