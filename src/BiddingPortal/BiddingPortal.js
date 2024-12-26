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
    const [totalBidPoints, setTotalBidPoints] = useState(0);
    /**useEffect(() => {
        (async () => {
            await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(res => {
                setSubjects(res.data);
            })
        })();
    }, [])**/
    useEffect(() => {
    (async () => {
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            // Ensure `res.data` contains `data` as an array before sorting
            if (Array.isArray(res.data)) {
                const sortedSubjects = res.data.sort((a, b) => {
                    if (a.Term === b.Term) {
                        return a.Credits - b.Credits; // Sort by Credits if Term is the same
                    }
                    return a.Term - b.Term; // Sort by Term
                });
                setSubjects({ data: sortedSubjects });
            } else {
                console.error("Unexpected response structure:", res.data);
            }
        }).catch(err => {
            console.error("Error fetching subjects:", err);
            });
        })();
    }, []);

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

    const handleBidChange = (subjectCode, value) => {
        const bidPoints = parseInt(value, 10) || 0;
        const newValues = { ...formik.values, [subjectCode]: bidPoints };
        const totalPoints = Object.values(newValues).reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0);
        setTotalBidPoints(totalPoints);
    };
    
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
            <h3>Points Left to Bid: <u>{points - totalBidPoints}</u></h3>
            <form onSubmit={formik.handleSubmit}>
                <div id='subjForm'>{
                    subjects.data.map(ele => <FormComponent key={ele.SubCode} element={ele} formik={formik} onBidChange={handleBidChange}/>)
                }</div>
                <br></br>
                <div id='div-css'>
                    <button class='button-89' id='buttonSubmit' type="Submit">Submit</button>
                </div>
            </form >

        </div>
    )
}
