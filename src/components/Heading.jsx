import React from "react";

function Heading(props) {
    // console.log("Heading Props:", props);

    return (
        <header>
            <h4>Question: {props.currentQuestion + 1}/10</h4>
            { 
                props.points || props.points === 0 ?
                <h3>{props.points} points</h3> :
                ""
            }
            {
                props.remainingTime && 
                <h4>Remaining Time: {props.remainingTime}</h4>
            }
        </header>
    );
}

export default Heading;