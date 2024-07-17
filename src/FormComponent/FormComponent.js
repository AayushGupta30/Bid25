import React from "react";
export default function FormComponent(props) {
    const { element, formik, onBidChange } = props

    const handleInputChange = (e) => {
        formik.handleChange(e);
        onBidChange(element.SubCode, e.target.value);
    };
    
    if(element.Credits === 3 || element.Credits === 4)
    {
        return (
            <div id='subjDiv'>
                <br></br>
                <h5>{element.SubCode} - {element.SubjectName}</h5>
                <h5>Faculty: {element.Professor}</h5>
                <h6>Total Seats:{element.NoOfSeats}</h6>
                <h6>Available Seats:{element.AvailableSeats}</h6>
                <h6>Credits: {element.Credits}</h6>
                <h6>Term: {element.Term}</h6>
                <input type='number' defaultValue={0} onChange={handleInputChange} name={element.SubCode} id={element.SubCode} placeholder="Enter Bid" required="true" min="0" />
            </div>
        )
    }
    else
    {
        return (
            <div id='subjDiv'>
                <br></br>
                <h5>{element.SubCode} - {element.SubjectName}</h5>
                <h5>Faculty: {element.Professor}</h5>
                <h6>Total Seats:{element.NoOfSeats}</h6>
                <h6>Available Seats:{element.AvailableSeats}</h6>
                <h6>Credits: {element.Credits}</h6>
                <h6>Term: 1/2 </h6>
                <input type='number' defaultValue={0} onChange={handleInputChange} name={element.SubCode} id={element.SubCode} placeholder="Enter Bid" required="true" min="0" />
            </div>
        )

    }
    
}
