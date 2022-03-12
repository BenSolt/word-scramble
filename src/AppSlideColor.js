import { useEffect, useState } from "react";
import getLetterCountMap from "./utils/utils.js";
import "./AppSlideColor.css";
import "./AppModal.css";

function AppLetter() {

    const rowOne = [], rowTwo = [], rowThree = [];
    const [keyLetter, setKeyLetter] = useState("");
    var colorChange = { state2: 'lightgray' }
    //const [color, setColor] = useState(colorChange);

    // ASSIGN RANDOM LETTERS
    function randomLetrs(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const WordsToSolve = [
        { letters: [0, "D", "R", "I", "N", "K", randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1)] },
        { letters: [0, "W", "A", "T", "E", "R", randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1)] },
        { letters: [0, "A", "P", "P", "L", "E", randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1), randomLetrs(1)] }
    ];

    const gameboardArr = [
        [0, 1, 1, 1, 1, 1]
    ]

    //const solutionWords = ['0DRINK', '0WATER'];
    //const pickNumber = Math.floor(Math.random() * solutionWords.length);

    const solutionWords = ['0DRINK', '0WATER', '0APPLE'];
    let pickNumber = Math.floor(Math.random() * WordsToSolve.length);
    //let pickNumber = 0;
    const [wordz, setWordz] = useState(solutionWords[pickNumber]);
    const [wordDisplay, setWordDisplay] = useState();

    function getShuffledPuzzle() {

        while (WordsToSolve[pickNumber].letters.length) {
            //const random = Math.floor(Math.random() * WordsToSolve.length - 2);
            const origLayout = 0;
            if (rowOne.length < 6) {
                rowOne.push(WordsToSolve[pickNumber].letters.splice(origLayout, 1)[0]);
            } else if (rowTwo.length < 6) {
                rowTwo.push(WordsToSolve[pickNumber].letters.splice(origLayout, 1)[0]);
            }
            else {
                rowThree.push(WordsToSolve[pickNumber].letters.splice(origLayout, 1)[0]);
            }
        }

        return [rowOne, rowTwo, rowThree];
    };

    function getPuzzle() {
        let puzzle = getShuffledPuzzle();
        return puzzle;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////    
    const [wordGrid, setWordGrid] = useState([]);
    const [puzzle, setPuzzle] = useState([]);
    // const [complete, setComplete] = useState(false);
    const [moves, setMoves] = useState(0);

    const [puzzleRules, setPuzzleRules] = useState(gameboardArr);
    //////////////////////////////////////////////////////////////////////

    const [solveWord, setSolveWord] = useState([]);
    const [helpOn, setHelpOn] = useState(false)

    let falttenArrjoined = flattenArray(puzzle).join("")
    let replaceZero = falttenArrjoined.replaceAll('0', '');


    const [puzzle2, setPuzzle2] = useState([]);
    ////////////////////////////////////////////////////////////

    useEffect(() => {

        function initializePuzzleGrid() {
            let newWordGrid = [];
            let solveWordArr = [];
            let newGridRules = [];
            let newGrid2 = [];

            for (let i = 0; i < 3; i++) {
                newWordGrid.push([])
                solveWordArr.push([])
                newGridRules.push([])

                newGrid2.push([]);
            }

            //SOLVE WORD
            for (let i = 0; i < 1; i++) {
                for (let j = 1; j < 6; j++) {
                    solveWordArr[i].push({ letter: wordz[i + j], state: "tileStart" });
                }
            }

            for (let i = 0; i < 1; i++) {
                for (let j = 1; j < 6; j++) {
                    newGridRules[i].push({ letter: keyLetter, state: "tileStart" });
                }
            }

            // MY NEW GRID
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 6; j++) {
                    if (i === 0 && j === 0) {
                        //newGrid2[i].push({ letter: 0, state: "zeroTile" });
                        newGrid2[i].push({ letter: 0, state: "zeroTile" });
                    } else if (i === 0) {
                        newGrid2[i].push({ letter: wordz[i + j], state: "tileStart" });
                    } else {
                        newGrid2[i].push({ letter: randomLetrs(1), state: "tileStart" });
                    }
                }
            }

            setPuzzle(getPuzzle())
            setWordGrid(newWordGrid);
            setWordz(wordz);
            setSolveWord(solveWordArr);
            setPuzzleRules(puzzleRules);

            setPuzzle2(newGrid2);
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

    function movePiece(x, y) {

        // if (!complete) {
        if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
            const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

            const newPuzzle = puzzle.map(row => row.slice());

            // LEFT AND RIGHT
            if (x === emptySlot.x && y < emptySlot.y) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
                newPuzzle[x][y + 1] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("RIGHT");

            } else if (x === emptySlot.x && y > emptySlot.y) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
                newPuzzle[x][y - 1] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("LEFT");
            }

            // UP AND DOWN
            if (y === emptySlot.y && x < emptySlot.x) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
                newPuzzle[x + 1][y] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("DOWN");

            } else if (y === emptySlot.y && x > emptySlot.x) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
                newPuzzle[x - 1][y] = newPuzzle[x][y];
                newPuzzle[x][y] = 0;
                //console.log("Up");
            }

            setPuzzle(newPuzzle);
            setMoves(moves + 1);
            checkCompletion(newPuzzle);
        }
        // }
    };

    ///////////////////////////////////////////////////////////////////////


    function movePiece2(x, y) {

        // if (!complete) {
        if (checkNeighbours2(x, y) || checkNeighbours2(x, y, 2)) {
            const emptySlot = checkNeighbours2(x, y) || checkNeighbours2(x, y, 2);

            const newPuzzle = puzzle2.map(row => row.slice());
            const solCountVal = solutionCountMap[newPuzzle[x][y].letter];
            const newWordGrid = newPuzzle;
            const currentWord = newWordGrid[0];

            // LEFT AND RIGHT


            if (x === emptySlot.x && y < emptySlot.y) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle2[x][y + 1];
                newPuzzle[x][y + 1] = newPuzzle[x][y];
                /////////////////////////////////////////////////////////////////
                // console.log("moveLetr:", newPuzzle[x][y].letter)
                // if (newPuzzle[x] === 0 && newPuzzle[x][y].letter === wordz[y + 1]) {
                //     newPuzzle[x][y].state = "tileCorrect";
                // } else if (newPuzzle[x] === 0 && solCountVal && solCountVal > 0) {
                //     newPuzzle[x][y].state = "tileIncorrect";
                // } else {
                //     newPuzzle[x][y].state = "tileStart";
                // }
                /////////////////////////////////////////////////////////////////
                newPuzzle[x][y] = 0;
                //console.log("RIGHT");

            } else if (x === emptySlot.x && y > emptySlot.y) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle2[x][y - 1];
                newPuzzle[x][y - 1] = newPuzzle[x][y];
                /////////////////////////////////////////////////////////////////
                // if ( newPuzzle[x] === 0 && newPuzzle[x][y].letter === wordz[y - 1]) {
                //     newPuzzle[x][y].state = "tileCorrect";
                // } else if (newPuzzle[x] === 0 && solCountVal && solCountVal > 0) {
                //     newPuzzle[x][y].state = "tileIncorrect";
                // } else {
                //     newPuzzle[x][y].state = "tileStart";
                // }
                /////////////////////////////////////////////////////////////////
                newPuzzle[x][y] = 0;
                //console.log("LEFT");
            }

            // UP AND DOWN
            if (y === emptySlot.y && x < emptySlot.x) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle2[x + 1][y];
                newPuzzle[x + 1][y] = newPuzzle[x][y];
                //////////////////////////////////////////////////////////////////
                // if (newPuzzle[x] === 0 && newPuzzle[x][y].letter === wordz[y - 1]) {
                //     newPuzzle[x][y].state = "tileCorrect";
                // // } else if (solCountVal && solCountVal > 0) {
                // //     newPuzzle[x][y].state = "tileIncorrect";
                // } else {
                //     newPuzzle[x][y].state = "tileStart";
                // }
                /////////////////////////////////////////////////////////////////
                newPuzzle[x][y] = 0;
                //console.log("DOWN");

            } else if (y === emptySlot.y && x > emptySlot.x) {
                newPuzzle[emptySlot.x][emptySlot.y] = puzzle2[x - 1][y];
                newPuzzle[x - 1][y] = newPuzzle[x][y];
                //////////////////////////////////////////////////////////////////
                // if (newPuzzle[x] === 0 && newPuzzle[x][y].letter === wordz[y - 1]) {
                //     newPuzzle[x][y].state = "tileCorrect";
                // } else if (solCountVal && solCountVal > 0) {
                //     newPuzzle[x][y].state = "tileIncorrect";
                // } else {
                //     newPuzzle[x][y].state = "tileStart";
                // }
                /////////////////////////////////////////////////////////////////

                newPuzzle[x][y] = 0;
                //console.log("Up");
            }

            setPuzzle2(newPuzzle);
            setMoves(moves + 1);
            checkCompletion(newPuzzle);
        }
        // }
    };

    ////////////////////////////////////////////////////////////////////////////
    // CHECK COMPLETION ------- CHECK COMPLETION ------ CHECK COMPLETION
    function checkCompletion(puzzle) {
        let letrRemove = [];
        let flatten = flattenArray(puzzle).join("")

        for (let i = 0; i < flattenArray(puzzle).length; i++) {
            if (i > 5) {
                letrRemove.push(flattenArray(puzzle)[i])
            }
        }
        let removeGroup = letrRemove.join("")
        replaceString = flatten.replaceAll(removeGroup, '');

        if (wordz === replaceString) {
            console.log("WIN: ", wordz)
            gameOverWon()
            setWordDisplay(removeGroup)
        }
    };

    let replaceString = replaceZero.replaceAll(wordDisplay, '');

    function checkNeighbours(x, y, d = 1) {
        const neighbours = [];

        if (puzzle[x][y] !== 0) {
            neighbours.push(puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y });
            neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
            neighbours.push(puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y });
            neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
        }
        const emptySlot = neighbours.find(el => typeof el === "object");
        return emptySlot;
    };

    //////////////////////////////////////////////////////////////////
    function checkNeighbours2(x, y, d = 1) {
        const neighbours = [];
        //if (puzzle2[x][y] !== 0) {
        if (puzzle2[x][y].letter !== 0) {
            //console.log("Check Neighbors2:", puzzle2[x][y].letter)
            neighbours.push(puzzle2[x - d] && puzzle2[x - d][y] === 0 && { x: x - d, y: y });
            neighbours.push(puzzle2[x][y + d] === 0 && { x: x, y: y + d });
            neighbours.push(puzzle2[x + d] && puzzle2[x + d][y] === 0 && { x: x + d, y: y });
            neighbours.push(puzzle2[x][y - d] === 0 && { x: x, y: y - d });
            neighbours.push(puzzle2[x][y - d].letter === 0 && { x: x, y: y - d });
        }

        const emptySlot = neighbours.find(el => typeof el === "object");
        return emptySlot;
    };

    // function resetPuzzle() {
    //     setComplete(false);
    //     setPuzzle(getPuzzle());
    //     setMoves(0);
    // };

    function changeAText() {
        helpOn ? setHelpOn(false) : setHelpOn(true)
    }

    // MODAL2
    var modal2 = document.getElementById("myModal2");

    // WON GAME
    function gameOverWon() {
        modal2.style.display = "block";
    }
    //CLOSE MODAL2
    function onClickSpan() {
        modal2.style.display = "none";
    }

    // REFRESH PAGE
    const refreshPage = () => {
        window.location.reload();
    }


    // GAME RULES ///////////////////////////////////////
    var GameRulesModal = document.getElementById("gameRulesModal");

    function gameRules() {
        GameRulesModal.style.display = "block";
    }
    //CLOSE GAME RULES ///////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const solutionCountMap = getLetterCountMap(wordz);

    function handleSubmit(letter) {
        const newWordGrid = [...puzzle];
        const currentWord = newWordGrid[0];
        const currentWordArr = [];
        let replaceString = replaceZero.replaceAll(wordDisplay, '');


        for (let i = 0; i < wordz.length; i++) {

            const solChar = wordz[i];
            const solCountVal = solutionCountMap[currentWord[i]];
            if (currentWord[i] === solChar) {
                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
                // GREEN VALUE
                console.log("GREEN:", currentWord[i]);
                colorChange.state2 = "green"
                currentWordArr.push(currentWord[i])

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');

                if (currentWordString === replaceString) {
                    console.log("WIN!!!!!")
                    gameOverWon()
                }
            }
            //YELLOW VALUES
            else if (solCountVal && solCountVal > 0) {
                colorChange.state2 = "yellow"
                console.log("YELLOW:", currentWord[i]);
                solutionCountMap[currentWord[i]] = solutionCountMap[currentWord[i]] - 1;
            }
            else {
                console.log("GRAY", currentWord[i]);
            }

        }
        setKeyLetter(letter);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function handleSubmit2(letter) {
        const newWordGrid = [...puzzle2];
        const currentWord = newWordGrid[0];
        const currentWordArr = [];
        let replaceString = replaceZero.replaceAll(wordDisplay, '');


        for (let i = 0; i < wordz.length; i++) {

            const solChar = wordz[i];
            const solCountVal = solutionCountMap[currentWord[i].letter];
            if (currentWord[i].letter === solChar) {
                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
                // GREEN VALUE
                console.log("GREEN:", currentWord[i].letter);
                currentWordArr.push(currentWord[i].letter)
                currentWord[i].state = "tileCorrect";

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');

                if (currentWordString === replaceString) {
                    console.log("WIN!!!!!")
                    gameOverWon()
                }
            }
            //YELLOW VALUES
            else if (solCountVal && solCountVal > 0) {
                console.log("YELLOW:", currentWord[i].letter);
                currentWord[i].state = "tileIncorrect";
                solutionCountMap[currentWord[i].letter] = solutionCountMap[currentWord[i].letter] - 1;
            }
            else {
                currentWord[i].state = "tileStart";
                console.log("GRAY", currentWord[i].letter);
            }

        }
        setKeyLetter(letter);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            <div className="board">
                {puzzle.map((row, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex"
                        }}
                    >
                        {row.map((col, j) => {
                            const solutionCountMap = getLetterCountMap(wordz);
                            const solCountVal = solutionCountMap[puzzle[i][j]]
                            var solChar = wordz[i + j]

                            if (col === 0) {
                                colorChange.state2 = "transparent"
                                // LETTER IN WORD RIGHT SPOT - GREEN 
                            } else if (i === 0 && puzzle[i][j] === solChar) {
                                colorChange.state2 = "green"
                                // LETTER WRONG SPOT - YELLOW
                            } else if (i === 0 && solCountVal && solCountVal > 0) {
                                colorChange.state2 = "yellow"
                                // LETTER NOT IN WORD
                            } else {
                                colorChange.state2 = "lightgray"
                            }
                            return (
                                <div className="tile"
                                    key={`${i}-${j}`}
                                    onClick={() => movePiece(i, j)}
                                    style={{
                                        backgroundColor: colorChange.state2,
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
                <button className="buttonPlayAgain"
                    onClick={() => { refreshPage(); }}> Play Again
                </button>

                <button onClick={handleSubmit}>ENTER</button>
            </div>

            <div id="myModal2" className="modal">
                <div className="modal-content">
                    <span onClick={onClickSpan} className="close">&times;</span>
                    <h2>Congratulations you won in <p className="movesColor">{moves}</p> moves!</h2>
                    <h2>The word was <p className="movesColor">{replaceString}</p></h2>
                </div>
            </div>


            <div className="board">
                {puzzle2.map((row, rowIndex) => (
                    <div className="rowWrapper2" key={rowIndex}>

                        {row.map((col, colIndex) => (
                            <div className={col.state}
                                //key={colIndex}
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => movePiece2(rowIndex, colIndex)}
                            >
                                <div className="letterposit2">
                                    <p>{puzzle2[rowIndex][colIndex].letter}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="buttonPlayAgain" onClick={handleSubmit2}>ENTER2</button>

        </div>
    );
}

export default AppLetter;