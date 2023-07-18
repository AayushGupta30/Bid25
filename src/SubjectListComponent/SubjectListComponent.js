import React from "react";
export default function SubjectListComponent(props) {
    console.log()
    const { data } = props
    const { SubjectName, SubCode, Points } = data
    return (
        <div>
            <h4>{`${SubjectName} --- ${SubCode} --- ${Points}`}</h4>
        </div>
    )
}