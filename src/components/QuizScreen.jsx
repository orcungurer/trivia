import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Question from "./Question";
import WrongAnswer from "./WrongAnswer";

function QuizScreen(props) {
    // console.log("QuizScreen Props:", props);
    
    const {questions, setQuestions, points, setPoints} = props;

    const [options, setOptions] = useState();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [count, setCount] = useState(15);

    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        if(!selectedOption) {
            const interval  = setInterval(() => {
                // console.log(count);
                setCount(count - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    useEffect(() => {
        // console.log("Questions(Uncomment to reply all correctly) ", questions);

        setOptions(
            questions && 
            handleShuffle([
                questions[currentQuestion].correct_answer,
                ...questions[currentQuestion].incorrect_answers
            ])
        );
    }, [questions, currentQuestion]);

    // console.log(options);

    function handleShuffle(option) {
        return option.sort(() => Math.random() - 0.5);
    }
    
    return (
        <div>
            {
            count > 0 ?
            <div>
                <Heading currentQuestion={currentQuestion} points={!selectedOption && points} remainingTime={!selectedOption && count} />
                <div className="container">
                    <form className="form">
                        {
                            questions ? 
                            <Question
                                currentQuestion={currentQuestion}
                                setCurrentQuestion={setCurrentQuestion}
                                questions={questions}
                                options={options}
                                correct={questions[currentQuestion].correct_answer}
                                points={points}
                                setPoints={setPoints}
                                setQuestions={setQuestions}
                                count={count}
                                setCount={setCount}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            /> : 
                            <div className="loading">LOADING...</div>
                        }
                    </form>
                </div>
            </div> :
            <div className="wrong-answer">
                <WrongAnswer text="Time is up." total={points} />
            </div>
            }
        </div>
    );
}

export default QuizScreen;