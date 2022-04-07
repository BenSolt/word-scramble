import { useState, useEffect, useRef } from "react";
import getLetterCountMap from "./utils/utils.js";
import "./AppWordScramble.css";
import "./AppModal.css";
import wordsSolve from './components/WordsSolve';
import WordModal from './WordModal';

// import WordScrambleScores from './WordScrambleScores';

const solveWordsArr = wordsSolve;
//const solveWordsArr = ['0DRINK', '0WATER', '0APPLE'];
let pickNumber = Math.floor(Math.random() * solveWordsArr.length);
const wordPick = solveWordsArr[pickNumber]

const arr = [
    { id: 0, letter: '0', state: "tileStart" },
    { id: 1, letter: wordPick[1], state: "tileStart" },
    { id: 2, letter: wordPick[2], state: "tileStart" }, { id: 3, letter: wordPick[3], state: "tileStart" },
    { id: 4, letter: wordPick[4], state: "tileStart" }, { id: 5, letter: wordPick[5], state: "tileStart" },
    { id: 6, letter: randomLetrs(1), state: "tileStart" }, { id: 7, letter: randomLetrs(1), state: "tileStart" },
    { id: 8, letter: randomLetrs(1), state: "tileStart" },

    { id: 9, letter: randomLetrs(1), state: "tileStart" }, { id: 10, letter: randomLetrs(1), state: "tileStart" },
    { id: 11, letter: randomLetrs(1), state: "tileStart" }, { id: 12, letter: randomLetrs(1), state: "tileStart" },
    { id: 13, letter: randomLetrs(1), state: "tileStart" }, { id: 14, letter: randomLetrs(1), state: "tileStart" },
    { id: 15, letter: randomLetrs(1), state: "tileStart" }, { id: 16, letter: randomLetrs(1), state: "tileStart" },
    { id: 17, letter: randomLetrs(1), state: "tileStart" },

    // BOARD SIZE 6 by 5
    { id: 18, letter: randomLetrs(1), state: "tileStart" }, { id: 19, letter: randomLetrs(1), state: "tileStart" },
    { id: 20, letter: randomLetrs(1), state: "tileStart" }, { id: 21, letter: randomLetrs(1), state: "tileStart" },
    { id: 22, letter: randomLetrs(1), state: "tileStart" }, { id: 23, letter: randomLetrs(1), state: "tileStart" },
    { id: 24, letter: randomLetrs(1), state: "tileStart" }, { id: 25, letter: randomLetrs(1), state: "tileStart" },
    { id: 26, letter: randomLetrs(1), state: "tileStart" }, { id: 27, letter: randomLetrs(1), state: "tileStart" },
    { id: 28, letter: randomLetrs(1), state: "tileStart" }, { id: 29, letter: randomLetrs(1), state: "tileStart" },

    //{ id: 30, letter: randomLetrs(1), state: "tileStart" }, 
    // { id: 31, letter: randomLetrs(1), state: "tileStart" }, { id: 32, letter: randomLetrs(1), state: "tileStart" }, 
    // { id: 33, letter: randomLetrs(1), state: "tileStart" }, { id: 34, letter: randomLetrs(1), state: "tileStart" }, 
    // { id: 35, letter: randomLetrs(1), state: "tileStart" },
];

const SIZE = 6;

function randomLetrs(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (8 - 1) + 1);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffle(arr);

function getPos(index) {
    return {
        row: Math.floor(index / SIZE),
        col: Math.floor(index % SIZE)
    };
};

function canSwap(targetIndex, blankIndex) {
    const { row: targetRow, col: targetCol } = getPos(targetIndex);
    const { row: blankRow, col: blankCol } = getPos(blankIndex);
    return Math.abs(targetRow - blankRow) + Math.abs(targetCol - blankCol) === 1;
};

function swap(cards, targetIndex, blankIndex) {
    const arr = [...cards];
    arr[targetIndex] = cards[blankIndex];
    arr[blankIndex] = cards[targetIndex];
    return arr;
};

function App() {

    const [blankIndex, setBlankIndex] = useState(arr[0].id);
    const [cards, setCards] = useState(arr);
    const [moves, setMoves] = useState(0);

    function handleCardClick(targetIndex) {
        if (canSwap(targetIndex, blankIndex)) {
            startTimer();
            setMoves(moves + 1)
            setCards((cards) => swap(cards, targetIndex, blankIndex));
            setBlankIndex(targetIndex);
        }
    };

    const solutionCountMap = getLetterCountMap(wordPick);
    function checkWin() {
        let currentWordArr = []
        for (let i = 0; i < wordPick.length; i++) {
            const solChar = wordPick[i];
            if (cards[i].letter === solChar) {
                currentWordArr.push(cards[i].letter)

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');
                //let wordzNoZero = wordPick.replaceAll('0', '');

                if (currentWordString === wordPick) {
                    gameOverWon();
                }
            }
        }
    }

    // MODAL WON GAME
    function gameOverWon() {
        var modalWin = document.getElementById("myModalWin");
        // If modalWin exists run code.
        if (modalWin !== null) {
            setTimeout(function () {
                stopTimer();
            }, 10)
            setTimeout(function () {
                modalWin.style.display = "block";
            }, 500)
        }
    }

    // TIMER ////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    let [running, setRunning] = useState(false);
    let [time, setTime] = useState(0);
    let timerId = useRef(null);

    function convert(ms) {
        let milliseconds = Math.floor((ms % 1000) / 10);
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

        return minutes + ":" + seconds + ":" + milliseconds;
    }

    function startTimer() {
        setRunning(true);
    }
    function stopTimer() {
        setRunning(false);
    }

    useEffect(() => {
        if (running) {
            timerId.current = setTimeout(() => {
                setTime(time + 37);
            }, 37);
        } else {
            clearTimeout(timerId.current);
        }

        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        };
    });

    return (
        <div className="App2">

            <h1>WORD SCRAMBLE</h1>
            {/* <h5>by Ben Solt</h5> */}

            {/* <WordScrambleScores /> */}

            <WordModal
                timer={convert(time)}
                moves1={moves}
            />

            <div>
                <div className="board2">
                    {cards.map((num, i) => {
                        const solCountVal = solutionCountMap[cards[i].letter];
                        if (num.id === 0) {
                            return <div className="tileBlank" key={num.id} />;
                        }
                        for (let i = 0; i < wordPick.length; i++) {

                            const solChar = wordPick[i];

                            if (cards[i].letter === solChar) {
                                solutionCountMap[solChar] = solutionCountMap[solChar] - 1;
                                cards[i].state = 'tileGreen'
                            } else if (cards[i].id < 6) {
                                cards[i].state = 'tileYellow'
                            }
                            else if (solCountVal && solCountVal > 0) {
                                cards[i].state = 'tileYellow'
                                solutionCountMap[cards[i].letter] = solutionCountMap[cards[i].letter] - 1;
                            } else {
                                cards[i].state = 'tileStart'
                            }
                        }
                        checkWin();

                        return (
                            <div className={num.state} key={num.id} onClick={() => handleCardClick(i)}>
                                {/* <h4 className="Letter">{num.id}</h4> */}
                                <h1 className="letter">{num.letter}</h1>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;