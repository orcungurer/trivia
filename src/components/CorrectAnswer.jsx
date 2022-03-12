import React from "react";
import Avatar from "./Avatar";

function CorrectAnswer(props) {
    // console.log("CorrectAnswer Props:", props);
    
    const {total, count, setCount, currentQuestion, setCurrentQuestion, setSelectedOption} = props;

    function handleNextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
        setCount(15);
        setSelectedOption();
    }

    return (
        <div>
            <div className="container">
                <form className="form">
                    {
                        currentQuestion === 9 ?
                        <Avatar logo="celebration.svg" dimension="200" animation="animate__tada" /> :
                        <Avatar logo="correct.svg" dimension="200" animation="animate__shakeY" />
                    }

                    <h1>{currentQuestion === 9 ? "Congratulations!" : "Correct!"}</h1>

                    <div className="description">
                        <p>You have earned {100 + (count * 5)} points</p>
                        <p>(Time Bonus: {count * 5} points)</p>
                        <p>Total: {total} points</p>
                    </div>

                    {
                        currentQuestion === 9 ?
                        <button type="button" onClick={() => window.location.reload()} className="start-button">Play Again</button> :
                        <button type="button" onClick={handleNextQuestion} className="start-button">Next Question</button>
                    }
                </form>
            </div>
        </div>
    );
}

export default CorrectAnswer;