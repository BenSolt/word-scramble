import { useEffect, useState } from "react";
import getLetterCountMap from "./utils/utils.js";
import "./AppPaul.css";
import "./AppModal.css";

function AppLetter() {

    var colorChange = { state: 'lightgray' }

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

    const gameboardArr = [
        [0, 1, 1, 1, 1, 1]
    ]
    //const solutionWords = '0DRINK'
    const solutionWords = ['0DRINK', '0WATER', '0APPLE'];
    let pickNumber = Math.floor(Math.random() * solutionWords.length);
    //let pickNumber = 0;

    //console.log(solutionWords[pickNumber].charAt(Math.floor(Math.random() * solutionWords.length)));
    const [wordz, setWordz] = useState(solutionWords[pickNumber]);
    //const [wordz, setWordz] = useState(solutionWords);

    function shuffle(word) {
        var arr = word.split('');  // Convert String to array
        
        arr.sort(function() {
          return 0.5 - Math.random();
        });  
        word = arr.join('');  // Convert Array to string
        return word;       // Return shuffled string
      }
      //var word = 'ABCDEF';
      var word = wordz
      word = shuffle(word);
      //console.log(word);

    /////////////////////////////////////////////////////////////////////////////////////////////////////    
    const [wordGrid, setWordGrid] = useState([]);
    const [moves, setMoves] = useState(0);

    const [puzzleRules, setPuzzleRules] = useState(gameboardArr);
    //////////////////////////////////////////////////////////////////////

    const [solveWord, setSolveWord] = useState([]);
    const [helpOn, setHelpOn] = useState(false)

    const [puzzle2, setPuzzle2] = useState([]);
    const [emptyTileIndex, setEmptyTileIndex] = useState();

    useEffect(() => {

        function initializePuzzleGrid() {
            let solveWordArr = [];
            let newGrid2 = [];

            for (let i = 0; i < 3; i++) {
                solveWordArr.push([])
                newGrid2.push([]);
            }

            //SOLVE WORD
            for (let i = 0; i < 1; i++) {
                for (let j = 1; j < 6; j++) {
                    solveWordArr[i].push({ letter: wordz[i + j], state: "tileStart" });
                }
            }

            // MY NEW GRID
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 6; j++) {
                    if (i === 0 && j === 0) {
                        newGrid2[i].push({ letter: 0, state: "zeroTile" });
                    } else if (i === 0) {
                        newGrid2[i].push({ letter: wordz[i + j], state: "tileStart" });
                    } else {
                        newGrid2[i].push({ letter: randomLetrs(1), state: "tileStart" });
                    }
                }
            }
            // Make Zero tile dynamic
            var zeroTileIndex = { x: 0, y: 0 };

            //setPuzzle(getPuzzle())
            setWordGrid(newGrid2);
            setPuzzle2(newGrid2);

            setWordz(wordz);
            setSolveWord(solveWordArr);
            setPuzzleRules(puzzleRules);

            setEmptyTileIndex(zeroTileIndex)
        }

        if (wordGrid.length === 0) {
            initializePuzzleGrid();
        }
    });

    ////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    function isEmptyTileNeighbor(x, y) {

        return false;
    }

    // array of coordinates
    function neighborsOfEmptyTile(x, y) {
        //generate all valid neighbors of tile
        //  Y:    0 1 2 3 4 5
        //  X:0 - 0 A P P L E 
        //  X:1 - Q Q Q Q Q Q
        //  X:2 - Q Q Q Q Q Q

        // 0, 0 = Right: 0,1, Down: 1,0
        // 1, 0 =  Up: 0,0  Right: 1,1  Down: 2,0
        // 2,0 = Up: 1,0 Right: 2,1

        return [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 },
        { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 },
        { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 },
        ];
    }

    let atIndexZero = false;

    function canMoveTile(x, y) {
        let neighbors = neighborsOfEmptyTile()
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]

            if (x === 0 && y === 0) {
                console.log("zero")
                atIndexZero = true;
            }
            //NEIGHBORS EQUALS EACH OTHER
            if (x === neighbor.x && y === neighbor.y) {
                console.log("X:", neighbor.x, "Y:", neighbor.y)
                return true;
            }

        }
        return false;
    }

    // CHECK COMPLETION ------- CHECK COMPLETION ------ CHECK COMPLETION
    const solutionCountMap = getLetterCountMap(wordz);

    function checkCompletion(puzzle2) {
        const currentWord = puzzle2[0];
        const currentWordArr = [];

        for (let i = 0; i < wordz.length; i++) {

            const solChar = wordz[i];
            const solCountVal = solutionCountMap[currentWord[i].letter];
            if (currentWord[i].letter === solChar) {
                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;

                currentWord[i].state = "tileCorrect";
                currentWordArr.push(currentWord[i].letter)

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');

                //console.log("Current Word:", currentWordString , "Solve Word:", wordz.replaceAll('0', ''));
                let wordzNoZero = wordz.replaceAll('0', '');
                if (currentWordString === wordzNoZero && atIndexZero) {
                    console.log("WIN!!!!!")
                    gameOverWon()
                }

            } else if (solCountVal && solCountVal > 0) {
                currentWord[i].state = "tileIncorrect";
                solutionCountMap[currentWord[i].letter] = solutionCountMap[currentWord[i].letter] - 1;
            } else {
                currentWord[i].state = "tileStart";
            }
        }
    };

    // x, y is the coordinate the user is tapping on
    function moveTile(x, y) {

        if (canMoveTile(x, y)) {
            // swap empty tile and x,y coordinate in game board - useEffect
            // empty x , y coordinate update
            let temp = puzzle2[x][y]
            puzzle2[x][y] = puzzle2[emptyTileIndex.x][emptyTileIndex.y]
            puzzle2[emptyTileIndex.x][emptyTileIndex.y] = temp
            emptyTileIndex.x = x
            emptyTileIndex.y = y

            setPuzzle2(puzzle2);
            // IF CLICK ANY TILE.. it counts up.. NEEDS TO ONLY DO 1... time upon move.
            setMoves(moves + 1);
            checkCompletion(puzzle2);
        }
    }

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

    // function handleSubmit2(letter) {
    //     const newWordGrid = [...puzzle2];
    //     const currentWord = newWordGrid[0];
    //     const currentWordArr = [];

    //     for (let i = 0; i < wordz.length; i++) {

    //         const solChar = wordz[i];
    //         const solCountVal = solutionCountMap[currentWord[i].letter];
    //         if (currentWord[i].letter === solChar) {
    //             solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
    //             // GREEN VALUE
    //             currentWordArr.push(currentWord[i].letter)
    //             currentWord[i].state = "tileCorrect";
    //         }
    //         //YELLOW VALUES
    //         else if (solCountVal && solCountVal > 0) {
    //             currentWord[i].state = "tileIncorrect";
    //             solutionCountMap[currentWord[i].letter] = solutionCountMap[currentWord[i].letter] - 1;
    //         }
    //         else {
    //             currentWord[i].state = "tileStart";
    //         }
    //     }
    //     setKeyLetter(letter);
    // };

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
                                <div className="letterposit1">
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

            <div className="buttonHolder">
                <button className="buttonPlayAgain"
                    onClick={() => { refreshPage() }}> Play Again
                </button>
            </div>

            <div id="myModal2" className="modal">
                <div className="modal-content">
                    <span onClick={onClickSpan} className="close">&times;</span>
                    <h2>Congratulations you won in <p className="movesColor">{moves}</p> moves!</h2>

                </div>
            </div>


            <div className="board">
                {puzzle2.map((row, rowIndex) => (
                    <div className="rowWrapper2" key={rowIndex}>

                        {row.map((col, colIndex) => (
                            <div className={col.state}
                                //key={colIndex}
                                key={`${rowIndex}-${colIndex}`}
                                //onClick={() => movePiece2(rowIndex, colIndex)}
                                onClick={() => moveTile(rowIndex, colIndex)}
                            >
                                <div className="letterposit2">
                                    <p>{puzzle2[rowIndex][colIndex].letter}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="buttonHolder">
                {/* <button className="buttonPlayAgain" onClick={handleSubmit2}>ENTER2</button> */}
                <button className="buttonPlayAgain">ENTER2</button>
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