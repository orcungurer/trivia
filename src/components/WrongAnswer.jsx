import React from "react";
import Avatar from "./Avatar";

function WrongAnswer(props) {
    // console.log("WrongAnswer Props:", props);

    return (
        <div>
            <div className="container">
                <form className="form">
                    <Avatar logo="false.svg" dimension="200" animation="animate__shakeX" />
                    <h1>Oops. Game Over.</h1>
                    <div className="description">
                        <p>{props.text}</p>
                        <p>Total: {props.total} points</p>
                    </div>
                    <button type="button" onClick={() => window.location.reload()} className="start-button">Play Again</button>
                </form>
            </div>
        </div>
    );
}

export default WrongAnswer;