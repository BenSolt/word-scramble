import { useEffect, useState } from "react";
import keys from './components/keys';

import getLetterCountMap from "./utils/utils.js";

import './WordGame.css';
import './AppModal.css';

function WordGame() {
    const [wordGrid, setWordGrid] = useState([]);
    const [currentFocusedRow, setCurrentFocusedRow] = useState(0);

    const [keyLetter, setKeyLetter] = useState("");
    const [tile, setTile] = useState(0);

    //var solutionWord = "APPLE";

    var solutionWords = ['PAPER', 'APPLE', 'PENNY'];

    var number = Math.floor(Math.random() * solutionWords.length);

    const [wordz, setWordz] = useState(solutionWords[number]);

    useEffect(() => {
        function initializeWordGrid() {
            let newWordGrid = [];
            for (let i = 0; i < 6; i++) {
                newWordGrid.push([])
            }
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 5; j++) {
                    newWordGrid[i].push({ letter: keyLetter, state: "empty" }); // states: "correct", "wrongposition" , "incorrect", "empty"
                }
            }
            setWordGrid(newWordGrid);
            setWordz(wordz);
        }
        if (wordGrid.length === 0) {
            initializeWordGrid();
        }
    });

    const solutionCountMap = getLetterCountMap(wordz);
    //const solutionCountMap = getLetterCountMap(solutionWord);

    function handleSubmit(letter) {
        const newWordGrid = [...wordGrid];
        const currentWord = newWordGrid[currentFocusedRow];
        const currentWordArr = [];
        // console.log(wordz)
  
        for (let i = 0; i < wordz.length; i++) {
            const solChar = wordz[i];

            const solCountVal = solutionCountMap[currentWord[i].letter];
            if (currentWord[i].letter === solChar) {
                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
                // GREEN VALUE
                currentWord[i].state = "correct";
                currentWordArr.push(currentWord[i].letter)

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');
                console.log('string: ',currentWordString);
                //MESSAGE - YOU WON!
                if (currentWordString === wordz) {
                    gameOverWon()
                }
            }
            //YELLOW VALUES
            else if (solCountVal && solCountVal > 0) {
                currentWord[i].state = "wrongposition";
                solutionCountMap[currentWord[i].letter] = solutionCountMap[currentWord[i].letter] - 1;
            }
            else {
                currentWord[i].state = "empty";
            }
            if (currentWord[i].state !== "correct" && tile === 5) {
                setCurrentFocusedRow(currentFocusedRow + 1);
                setTile(0)
            }
        }
        setKeyLetter(letter);
    };

    
////////////////////////////////////////////////////////////////////////////////
// WORDLE SINGLE WORD WORDLE SINGLE WORD WORDLE SINGLE WORD  WORDLE SINGLE WORD
////////////////////////////////////////////////////////////////////////////////

    //     for (let i = 0; i < solutionWord.length; i++) {
    //         const solChar = solutionWord[i];

    //         const solCountVal = solutionCountMap[currentWord[i].letter];
    //         if (currentWord[i].letter === solChar) {
    //             solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
    //             // GREEN VALUE
    //             currentWord[i].state = "correct";
    //             currentWordArr.push(currentWord[i].letter)

    //             let aa = currentWordArr.join()
    //             let currentWordString = aa.replaceAll(',', '');

    //             //MESSAGE - YOU WON!
    //             if (currentWordString === solutionWord) {  
    //                 gameOverWon()
    //             }
    //         }
    //         //YELLOW VALUES
    //         else if (solCountVal && solCountVal > 0) {
    //             currentWord[i].state = "wrongposition";
    //             solutionCountMap[currentWord[i].letter] = solutionCountMap[currentWord[i].letter] - 1;
    //         }
    //         else {
    //             currentWord[i].state = "empty";
    //         }

    //         if (currentWord[i].state !== "correct" && tile === 5) {
    //             //isCorrect = false;
    //             setCurrentFocusedRow(currentFocusedRow + 1);
    //             setTile(0)
    //         }
    //     }
    //     setKeyLetter(letter);
    //     //setIsGameOver(true);
    // };

    function handleClick(letter) {

        const newWordGrid = [...wordGrid];
        const currentWord = newWordGrid[currentFocusedRow];

        for (let i = 0; i < currentWord.length; i++) {

            if (currentWord[i] === currentWord[tile]) {
                currentWord[i].letter = letter;
                setTile(tile + 1)
                currentWord[i].state = "selected";
            }
            else {
                currentWord[i].state = "empty";
            }
        }
    }

    function handleDelete(letter) {

        const newWordGrid = [...wordGrid];
        const currentWord = newWordGrid[currentFocusedRow];

        for (let i = 0; i < currentWord.length; i++) {

            if (currentWord[i] === currentWord[tile - 1]) {
                currentWord[i].letter = '';

                setTile(tile - 1)
                currentWord[i].state = "selected";
            }
            else {
                currentWord[i].state = "empty";
            }
        }
        setKeyLetter(letter);
    }


    var modal = document.getElementById("myModal");

    // WON GAME
    function gameOverWon() {
        modal.style.display = "block";
    }

    //close the modal
    function onClickSpan() {
        modal.style.display = "none";
    }

    return (
        <div className="wordleGame">

            <div className="title">WORDLE GAME </div>

            <div className="wordleGameContainer">

                <div className="gameBoard">

                    {/* The Modal */}
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span onClick={onClickSpan} className="close">&times;</span>
                            <p>Congrats you win!The word was {wordz}</p>
                        </div>
                    </div>

                    {wordGrid.map((row, rowIndex) => (
                        <div className="rowWrapper" key={rowIndex}>

                            {row.map((col, colIndex) => (
                                <div className={col.state}
                                    key={colIndex}
                                >
                                    <div className="letterposit">{wordGrid[rowIndex][colIndex].letter}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='keyboard-container'>

                    {keys.map(a => (
                        <button onClick={() => handleClick(a.name)} key={a.id}>{a.name}</button>
                    ))}

                    <button onClick={handleDelete}>DELETE</button>
                    <button onClick={handleSubmit}>ENTER</button>
                </div>
            </div>
        </div>
    )
}

export default WordGame;
