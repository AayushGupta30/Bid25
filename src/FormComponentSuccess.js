import React, { useEffect, useState } from "react";
export default function FormComponentSuccess(props) {
    const { element } = props
    return (
        <div>
            <br></br>
            <h5>{element.SubCode} - {element.SubjectName}</h5>
            <h5>Faculty: {element.Professor}</h5>
            <h6>Total Seats:{element.NoOfSeats}</h6>
            <h6>Available Seats:{element.AvailableSeats}</h6>
            <h6>Credits: {element.Credits}</h6>
        </div>
    )
}
