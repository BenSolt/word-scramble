import { useEffect, useState } from "react";
import getLetterCountMap from "./utils/utils.js";
import "./AppSlide.css";
import "./AppModal.css";

function AppLetter() {

    const rowOne = [], rowTwo = [], rowThree = [];
    const [keyLetter, setKeyLetter] = useState("");
    var colorChange = { state: 'lightgray' }
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
            } else {
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

    ////////////////////////////////////////////////////////////

    useEffect(() => {

        function initializePuzzleGrid() {
            let newWordGrid = [];
            let solveWordArr = [];
            let newGridRules = [];

            for (let i = 0; i < 3; i++) {
                newWordGrid.push([])
                solveWordArr.push([])
                newGridRules.push([])
            }

            //SOLVE WORD
            for (let i = 0; i < 1; i++) {
                for (let j = 1; j < 6; j++) {
                    solveWordArr[i].push({ letter: wordz[i + j], state: "wordStart2" });
                }
            }

            for (let i = 0; i < 1; i++) {
                for (let j = 1; j < 6; j++) {
                    //newGridRules[i].push({ letter: wordz[i + j], state: "wordStart2" });
                    newGridRules[i].push({ letter: keyLetter, state: "wordStart2" });
                }
            }

                setPuzzle(getPuzzle())
                setWordGrid(newWordGrid);
                setWordz(wordz);
                setSolveWord(solveWordArr);
                setPuzzleRules(puzzleRules);
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
            neighbours.push(
                puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y });
            neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
            neighbours.push(puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y });
            neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
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
    function onClickSpan2() {
        GameRulesModal.style.display = "none";
    }

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
                colorChange.state = "green"
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
                colorChange.state = "yellow"
                console.log("YELLOW:", currentWord[i]);
                solutionCountMap[currentWord[i]] = solutionCountMap[currentWord[i]] - 1;
            }
            else {
                console.log("GRAY", currentWord[i]);
            }

        }
        setKeyLetter(letter);
    };


    // for( let i = 0; i < wordz.length; i++) {
    //     console.log('I:',wordz[i]) 
    // }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="App">

            <h1> WORD SCRAMBLE</h1>
            <h3>By Ben Solt</h3>

            <div className="topHolder">

                <button name="isGoing" className="buttonPlayAgain" id="gameRules" onClick={gameRules}>Game Rules</button>

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
                            console.log("solChar",solChar)

                            if (col === 0) {
                                colorChange.state = "transparent"
                                // LETTER IN WORD RIGHT SPOT - GREEN 
                            } else if (i === 0 && puzzle[i][j] === solChar) {
                                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
                                colorChange.state = "green"
                                // LETTER WRONG SPOT - YELLOW
                            } else if (i === 0 && solCountVal ) {
                            //} else if (i === 0 && solCountVal && solCountVal > 0) {
                                colorChange.state = "yellow"
                                solutionCountMap[puzzle[i][j]] = solutionCountMap[puzzle[i][j]] - 1;
                                // LETTER NOT IN WORD
                            } else {
                                colorChange.state = "lightgray"
                            }

                            return (
                                <div className="tile"
                                    key={`${i}-${j}`}
                                    onClick={() => movePiece(i, j)}
                                    style={{
                                        backgroundColor: colorChange.state,
                                        // cursor: complete ? "not-allowed" : "pointer",
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
                {/* <button className="buttonReload"
                    onClick={() => { resetPuzzle() }}> Reload Word 
                </button> */}

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


            {/*//////////////////// GAME RULES ////////////////////////////////////////////////*/}
            <div id="gameRulesModal" className="modal">
                <div className="modal-content">
                    <span onClick={onClickSpan2} className="close">&times;</span>
                    <h2>How Play</h2>
                    <h3>To win, board has to look like example below.</h3>
                    <h3>Letter in correct spot:</h3>
                    <h3>tile = green</h3>
                    <h3>Letter in wrong spot:</h3>
                    <h3>tile = yellow</h3>
                    <h3>Letter not in word:</h3>
                    <h3>tile = gray</h3>
                    <div className="boardRules">
                        {puzzleRules.map((row, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex"
                                }}
                            >
                                {row.map((col, j) => {

                                    if (col === 0) {
                                        colorChange.state = "transparent"
                                    } else if (i === 0) {
                                        colorChange.state = "green"
                                    } else {
                                        colorChange.state = "lightgray"
                                    }
                                    return (
                                        <div className="tile2"
                                            key={`${i}-${j}`}
                                            style={{
                                                backgroundColor: colorChange.state,
                                            }}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppLetter;