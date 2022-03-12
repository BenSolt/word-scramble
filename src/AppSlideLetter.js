import { useEffect, useState } from "react";
import "./AppSlide.css";
import "./AppModal.css";

function AppLetter() {

    const rowOne = [], rowTwo = [], rowThree = [];
    const values = [0, "A", "B", "C", "D", "E"];


    const values2 = [
        { letters: [0, "D", "R", "I", "N", "K"] },
        { letters: [0, "W", "A", "T", "E", "R"] }
    ];

    // get Random Value (letters 0, 1) in values 2
    let pickNumber = Math.floor(Math.random() * values2.length);


    function getShuffledPuzzle() {
        //const values = [0, 1, 2, 3, 4, 5];
        //const values = [0, "A", "B", "C", "D", "E"];
        // Row1 = 1,2 Row2 = 3,4,5

        while (values.length) {
            //const random = Math.floor(Math.random() * values.length);
            const origLayout = 0;
            if (rowOne.length < 3) {
                rowOne.push(values.splice(origLayout, 1)[0]);
            } else if (rowTwo.length < 3) {
                rowTwo.push(values.splice(origLayout, 1)[0]);
            } else {
                rowThree.push(values.splice(origLayout, 1)[0]);
            }
        }
        return [rowOne, rowTwo, rowThree];
    };

    // function isSolvable(puzzle) {
    //     return getInversionsCount(puzzle) % 2 === 0;
    // };

    function getPuzzle() {
        let puzzle = getShuffledPuzzle();
        // while (!isSolvable(puzzle)) {
        //     puzzle = getShuffledPuzzle();
        // }

        return puzzle;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const [wordGrid, setWordGrid] = useState([]);
    //const [keyLetter, setKeyLetter] = useState("");
    //const values2 = [0, 1, 2, 3, 4, 5];
    //const randomNumber = Math.floor(Math.random() * values2.length);

    const [puzzle, setPuzzle] = useState([]);
    const [complete, setComplete] = useState(false);
    const [moves, setMoves] = useState(0);

    //////////////////////////////////////////////////////////////////////
    //const solutionWords = ['0AB'];
    // INCREASE SOLUTION WORD TO BE 5 letters.. should fix my issue with green.
    //const solutionWords = ['0AB', '0DE', '0AC']; 
    const solutionWords = ['0ABCDE', '0DEABC']; 
    const number = Math.floor(Math.random() * solutionWords.length);
    const [wordz, setWordz] = useState(solutionWords[number]);

    const [solveWord, setSolveWord] = useState([]);
    const [helpOn, setHelpOn] = useState(false)

    ////////////////////////////////////////////////////////////

    useEffect(() => {

        function initializePuzzleGrid() {
            let newWordGrid = [];
            let solveWordArr = [];
            for (let i = 0; i < 2; i++) {
                newWordGrid.push([])
                solveWordArr.push([])
            }

            //SOLVE WORD
            for (let i = 0; i < 1; i++) {
                for (let j = 0; j < 3; j++) {
                    solveWordArr[i].push({ letter: wordz[i + j], state: "wordStart2" });
                }
            }
            setPuzzle(getPuzzle())
            setWordGrid(newWordGrid);
            setWordz(wordz);
            setSolveWord(solveWordArr);
        }

        if (wordGrid.length === 0) {
            initializePuzzleGrid();
        }
    });

    // useEffect(() => {
    //     setPuzzle(getPuzzle());
    // }, []);

    //////////////////////////////////////////////////////////////////////////////////////

    function flattenArray(arr) {
        return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
    };

    var colorChange = { state: 'lightgray' }

    function movePiece(x, y) {

        if (!complete) {
            if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
                const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

                const newPuzzle = puzzle.map(row => row.slice());

                // LEFT AND RIGHT
                if (x === emptySlot.x && y < emptySlot.y) {
                    newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
                    newPuzzle[x][y + 1] = newPuzzle[x][y];
                    newPuzzle[x][y] = 0;
                    // console.log("RIGHT")

                } else if (x === emptySlot.x && y > emptySlot.y) {
                    newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
                    newPuzzle[x][y - 1] = newPuzzle[x][y];
                    newPuzzle[x][y] = 0;
                    //console.log("LEFT")
                }

                // UP AND DOWN
                if (y === emptySlot.y && x < emptySlot.x) {
                    newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
                    newPuzzle[x + 1][y] = newPuzzle[x][y];
                    newPuzzle[x][y] = 0;
                    //console.log("DOWN")

                } else if (y === emptySlot.y && x > emptySlot.x) {
                    newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
                    newPuzzle[x - 1][y] = newPuzzle[x][y];
                    newPuzzle[x][y] = 0;
                    //console.log("Up")
                }

                setPuzzle(newPuzzle);

                setMoves(moves + 1);
                checkCompletion(newPuzzle);
            }
        }
    };


    function checkCompletion(puzzle) {

       // console.log(flattenArray(puzzle).join(""))
        //console.log('flattenArry:', flattenArray(puzzle[0]))

        //let aa = flattenArray(puzzle).join("")
        //let currentWordString = aa.replaceAll('CDE', '');

        if (wordz === "0ABCDE") {
        //if (wordz === "0ABCDE") {
            console.log(wordz)
            if (flattenArray(puzzle).join("") === "0ABCDE") {
            //     //setComplete(true);
                gameOverWon()
            }
        //} else if (wordz === "0DE") { 
        } else if (wordz === "0DEABC") {
            if (flattenArray(puzzle).join("") === "0DEABC") {
                gameOverWon()
            }
        } else if (wordz === "0AC") {
            if (flattenArray(puzzle).join("") === "0ACBED") {
                gameOverWon()
            }
        }

        //console.log("SolveWord:", wordz);
        // if (currentWordString === wordz) {
        //     setComplete(true);
        // }
    };

    function checkNeighbours(x, y, d = 1) {
        const neighbours = [];

        if (puzzle[x][y] !== 0) {
            neighbours.push(
                puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y },
            );
            neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
            neighbours.push(
                puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y }
            );
            neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
        }

        const emptySlot = neighbours.find(el => typeof el === "object");

        return emptySlot;
    };

    function resetPuzzle() {
        setComplete(false);
        setPuzzle(getPuzzle());
        setMoves(0);
        //setWordz(wordz);
    };

    function changeAText() {
        helpOn ? setHelpOn(false) : setHelpOn(true)
    }

    // MODAL
    var modal = document.getElementById("myModal");

    // WON GAME
    function gameOverWon() {
        modal.style.display = "block";
    }

    //CLOSE MODAL
    function onClickSpan() {
        modal.style.display = "none";
    }

    // REFRESH PAGE
    const refreshPage = () => {
        window.location.reload();
    }



    return (
        <div className="App">

            <h1> WORD SCRAMBLE</h1>
            <h3>By Ben Solt</h3>

            <div className="topHolder">

                {solveWord.map((row, rowIndex) => (
                    <div className="rowWrapper2" key={rowIndex}>

                        {row.map((col, colIndex) => (
                            <div className="solveletterBox"
                                key={colIndex}
                            >
                                <div className="letterposit2">
                                    {helpOn ? <p>{solveWord[rowIndex][colIndex].letter}</p> : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                <div className="checkboxHolder">
                    <input className="checkbox1" name="isGoing" type="checkbox" id="switch" checked={helpOn} onChange={changeAText} />
                    <h4>Toggle Hint</h4>
                </div>
            </div>


            {<h3>Moves: {moves}</h3>}
            <div className="board"
                style={{
                    border: `5px solid ${complete ? "black" : "gray"}`,
                }}
            >
                {puzzle.map((row, i) => (

                    <div
                        key={i}
                        style={{
                            display: "flex"
                        }}
                    >
                        {row.map((col, j) => {
                           
                            if (col === 0) {
                                colorChange.state = "transparent"
                                // LETTER IN WORD RIGHT SPOT - GREEN 
                            } else if (i === 0 && puzzle[i][j] === wordz[i + j]) {
                                colorChange.state = "green" 
                            // } else if (i === 1 && puzzle[i][j] === wordz[i + j +2]) {
                            //     colorChange.state = "green"    
                            } else if (i === 1 && puzzle[i][j] === values[i + j +2]) {
                                colorChange.state = "yellow" 
                                //console.log(values[i + j+2]) 
                            } else {
                                // LETTER NOT IN WORD
                                colorChange.state = "lightgray"
                            }
                           


                            return (
                                <div className="tile"
                                    key={`${i}-${j}`}
                                    onClick={() => movePiece(i, j)}
                                    style={{
                                        backgroundColor: colorChange.state,
                                        cursor: complete ? "not-allowed" : "pointer",
                                    }}
                                >
                                    <span className="tileText">
                                        {col !== 0 && col}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>


            <div className="buttonHolder">
                <button className="buttonReload"
                    onClick={() => {
                        resetPuzzle();
                    }}>
                    Reload Word
                </button>


                <button className="buttonPlayAgain"
                    onClick={() => {
                        refreshPage();
                    }}>
                    Play Again
                </button>
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span onClick={onClickSpan} className="close">&times;</span>
                    <p>Congrats you win!The word was {wordz}</p>
                </div>
            </div>

        </div>
    );
}

export default AppLetter;