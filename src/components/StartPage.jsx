import React, { useState } from "react";
import Avatar from "./Avatar";
import QuizScreen from "./QuizScreen";
import categoryOptions from "../categoryOptions";
import difficultyOptions from "../difficultyOptions";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function StartPage() {
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();
    const [userStarted, setUserStarted] = useState(false);
    const [questions, setQuestions] = useState();
    const [points, setPoints] = useState(0);

    function handleCategory(event) {
        const value = event.target.value;
        setCategory(value);
    }

    function handleDifficulty(event) {
        const value = event.target.value;
        setDifficulty(value);
    }
    
    function handleStart() {
        if(category && difficulty) {
            setUserStarted(!userStarted);
            
            fetch(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                // console.log("Data", responseData);
                var dataToUse = responseData.results;
                setQuestions(dataToUse);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Info",
                    text: "There is no API for this category and difficulty, please choose another."
                }).then(() => {
                    window.location.reload();
                });
            });
        } else {
            return Swal.fire({
                title: "Info",
                text: "Please select both category and difficulty."
            });
        }
    }

    return (
        <div>
            { 
                userStarted ? 
                <QuizScreen questions={questions} setQuestions={setQuestions} points={points} setPoints={setPoints} /> :
                <div className="container">
                    <form className="form">
                        <Avatar logo="trivia-logo.png" dimension="400" animation="animate__zoomIn trivia-logo" />
                        <h1>A Trivia Game</h1>

                        {/* Select Category without Material UI */}
                        {/* <select onChange={handleCategory} defaultValue={"placeholder"}>
                            <option value="placeholder" disabled hidden>Select Category</option>
                            {categoryOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </select> */}
                        
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Category"
                                    onChange={handleCategory}
                                    MenuProps={MenuProps}
                                >
                                    {categoryOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Select Difficulty without Material UI */}
                        {/* <select onChange={handleDifficulty} defaultValue={"placeholder"}>
                            <option value="placeholder" disabled hidden>Select Difficulty</option>
                            {difficultyOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </select> */}
                        
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Difficulty</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Difficulty"
                                    onChange={handleDifficulty}
                                    MenuProps={MenuProps}
                                >
                                    {difficultyOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <button type="button" onClick={handleStart} className="start-button">START GAME</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default StartPage;