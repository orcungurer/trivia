import React from "react";
import CorrectAnswer from "./CorrectAnswer";
import WrongAnswer from "./WrongAnswer";

function Question(props) {
    // console.log("Question Props:", props);

    const {
        currentQuestion,
        setCurrentQuestion,
        questions,
        options,
        correct,
        points,
        setPoints,
        count,
        setCount,
        selectedOption, 
        setSelectedOption
    } = props;

    function checkAnswer(answer) {
        setSelectedOption(answer);
        if (answer === correct) {
            // console.log(count);
            setPoints(points + 100 + (count * 5));
        }
    }

    return (
        <div>
            {
                !selectedOption ?
                <div className="container">
                    {
                        options &&
                        <div>
                            <h3>{questions[currentQuestion].question}</h3>
                            {options.map((option, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => checkAnswer(option)} 
                                    className="question-option-button"
                                >
                                {option}
                                </button>
                            ))}
                        </div>
                    }
                </div> :
                selectedOption === correct ?
                <CorrectAnswer 
                    total={points} count={count} setCount={setCount}
                    currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} 
                    setSelectedOption={setSelectedOption} 
                /> :
                <WrongAnswer text="Your answer is incorrect." total={points} />
            }
        </div>
    );
}

export default Question;