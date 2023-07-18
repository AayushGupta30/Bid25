import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import './BiddingPortal.css'
import axios from "axios";
import FormComponent from "../FormComponent/FormComponent"
import Cookies from "universal-cookie";

export default function BiddingPortal() {
    let navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const url = process.env.REACT_APP_HOSTURL + '/subjects'
    const [subjects, setSubjects] = useState(null);
    const [points, setPoints] = useState(null);
    const [name, setName] = useState(null);
    const [rollNumber, setRollNumber] = useState(null);
    const [objID, setObjID] = useState(null);
    const [round, setRound] = useState(null)
    const [project, setProject] = useState(null);
    useEffect(() => {
        (async () => {
            await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
                setSubjects(res.data);
            })
        })();
    }, [])
    useEffect(() => {
        const configuration = {
            method: "get",
            url: process.env.REACT_APP_HOSTURL + "/userDetails",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios(configuration)
            .then((result) => {
                setObjID(result.data._id)
                setPoints(result.data.points)
                setRollNumber(result.data.rollNumber)
                setName(result.data.name)
                setProject(result.data.project)
                setRound(result.data.round)
            })
            .catch((error) => {
                error = new Error();
            });
    }, []);
    const formik = useFormik(
        {
            initialValues: {},
            onSubmit: (values) => {
                let sum = 0;
                Object.keys(values).forEach(key => {
                    sum += values[key]
                    if (values[key] === 0) {
                        delete values[key]
                    }
                })
                if (sum === points) {
                    axios.post(process.env.REACT_APP_HOSTURL + `/addbid/${round}`, {
                        student: objID,
                        bids: values
                    })
                        .then((response) => {
                            console.log(response);
                            window.alert("Bids Placed Successfully")
                            let path = `/auth/success`;
                            navigate(path, {
                                state: {
                                    round
                                }
                            });
                            // { return (<AuthComponentSuccess subjectList={subjects.data} bidMade={valueArray} />) }
                        }, (error) => {
                            if (error.response) {
                                window.alert(error.response.data.error)
                            } else {
                                window.alert("Something went wrong!")
                            }
                        });
                }
                else {
                    console.log("here")
                    window.alert("Invalid Bid: " + "Bid Placed = " + sum + " Points Left = " + (points - sum))
                }
            }
        }
    );

    if (!subjects) return <div>Loading...</div>;

    return (
        <div >
            <br></br>
            <h2>{name} - {rollNumber}</h2>
            <h3>Points Left to Bid: <u>{points}</u></h3>
            <form onSubmit={formik.handleSubmit}>
                <div id='subjForm'>{
                    subjects.data.map(ele => <FormComponent key={ele.SubCode} element={ele} formik={formik} />)
                }</div>
                <br></br>
                <div id='div-css'>
                    <button class='button-89' id='buttonSubmit' type="Submit">Submit</button>
                </div>
            </form >

        </div>
    )
}