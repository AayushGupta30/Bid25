import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";
import SubjectListComponent from "./SubjectListComponent/SubjectListComponent";
import Header from "./HeaderComponent/Header";

// get token generated on login

export default function AuthComponentSuccess() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");
  const [subjectList, setSubjectList] = useState(null)
  const location = useLocation();
  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: process.env.REACT_APP_HOSTURL + "/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_HOSTURL + `/subjects/elected/${location.state.round}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(result => {
      setSubjectList(result.data.subjectList)
    })
  }, [message])

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
      <h1>Bidding Portal</h1>
      <h3 className="text-success">Bids Placed Successfully</h3>
      {subjectList?.map((data) => <SubjectListComponent data={data} />)}
      {/* logout */}
      <button class='button-89' type="submit" onClick={() => logout()}>
        Logout
      </button>
    </div>
    </>
  );
}
