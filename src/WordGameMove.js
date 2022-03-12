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

    const [testWordGrid, setTestWordGrid] = useState([]);

    var solutionWords = ['PAPER', 'APPLE', 'PENNY'];
    var number = Math.floor(Math.random() * solutionWords.length);

    const [wordz, setWordz] = useState(solutionWords[number]);


    useEffect(() => {
        function initializeWordGrid() {
            let newWordGrid = [];
            let newTestWordGrid = [];

            for (let i = 0; i < 6; i++) {
                newWordGrid.push([])
                newTestWordGrid.push([])
            }
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    newWordGrid[i].push({ letter: keyLetter, state: "empty" }); // states: "correct", "wrongposition" , "incorrect", "empty"
                }
            }
            //////////////////////////////////////////////////////////////////////////////////////////
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 5; j++) {
                    if (i === 0 && j === 0) {
                        newTestWordGrid[i].push({ letter2: 0, state: "Zero" });
                    } else {
                        newTestWordGrid[i].push({ letter2: randomLetrs(1), state: "empty" });
                    }
                    // TestWordGrid[i].push({ letter2: randomLetrs(1), state: "empty" });
                }
            }

            //////////////////////////////////////////////////////////////////////////////////////////////
            setWordGrid(newWordGrid);
            setTestWordGrid(newTestWordGrid);
            setWordz(wordz);
        }
        if (wordGrid.length === 0) {
            initializeWordGrid();
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function randomLetrs(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            //console.log(result)
        }
        return result;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const solutionCountMap = getLetterCountMap(wordz);

    function handleSubmit(letter) {
        const newWordGrid = [...testWordGrid];
    
        //const newWordGrid = [...wordGrid];
        const currentWord = newWordGrid[currentFocusedRow];
        const currentWordArr = [];

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
                console.log('string: ', currentWordString);
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

    function handleClick(letter) {

        const newWordGrid = [...testWordGrid];
        //const newWordGrid = [...wordGrid];
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

////////////////////////////////////////////////////////////////////////////////////////////////

    // function clickedTile() {
    //     console.log('CLIKED')
    // }

    //console.log(testWordGrid.map(row => row.slice()))

    function movePiece(x, y) {

        console.log("Location:", x, y)

        // if (!complete) {
        if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
            const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);
            
            //const newPuzzle = puzzle.map(row => row.slice());
            const newPuzzle = testWordGrid.map(row => row.slice());

            // LEFT AND RIGHT
            if (x === emptySlot.x && y < emptySlot.y) {
                //newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
                newPuzzle[emptySlot.x][emptySlot.y] = testWordGrid[x][y + 1];
                newPuzzle[x][y + 1] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                console.log("RIGHT");

            } else if (x === emptySlot.x && y > emptySlot.y) {
                //newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
                newPuzzle[emptySlot.x][emptySlot.y] = testWordGrid[x][y - 1];
                newPuzzle[x][y - 1] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("LEFT");
            }

            // UP AND DOWN
            if (y === emptySlot.y && x < emptySlot.x) {
                //newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
                newPuzzle[emptySlot.x][emptySlot.y] = testWordGrid[x + 1][y];
                newPuzzle[x + 1][y] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("DOWN");

            } else if (y === emptySlot.y && x > emptySlot.x) {
                //newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
                newPuzzle[emptySlot.x][emptySlot.y] = testWordGrid[x - 1][y];
                newPuzzle[x - 1][y] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("Up");
            }

            //setPuzzle(newPuzzle);
            setTestWordGrid(newPuzzle)
            //setMoves(moves + 1);
            //checkCompletion(newPuzzle);
        }
        // }
    };

    function checkNeighbours(x, y, d = 1) {
        const neighbours = [];

        if (testWordGrid[x][y] !== 0) {
        //if (puzzle[x][y] !== 0) {
            neighbours.push(
                //puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y });
                testWordGrid[x - d] && testWordGrid[x - d][y] === 0 && { x: x - d, y: y });
            //neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
            neighbours.push(testWordGrid[x][y + d] === 0 && { x: x, y: y + d });
            //neighbours.push(puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y });
            neighbours.push(testWordGrid[x + d] && testWordGrid[x + d][y] === 0 && { x: x + d, y: y });
            //neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
            neighbours.push(testWordGrid[x][y - d] === 0 && { x: x, y: y - d });
        }

        const emptySlot = neighbours.find(el => typeof el === "object");

        return emptySlot;
    };

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


            <div className="gameBoard">

                {testWordGrid.map((row, rowIndex) => (
                    <div className="rowWrapper" key={rowIndex}>

                        {row.map((col, colIndex) => (
                            <div className={col.state}
                                key={`${rowIndex}-${colIndex}`}
                                //key={colIndex}
                                // onClick={clickedTile}
                                onClick={() => movePiece(rowIndex, colIndex)}
                            >
                                <div className="letterposit">{testWordGrid[rowIndex][colIndex].letter2}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default WordGame;