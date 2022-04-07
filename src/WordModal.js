import { useState, useEffect, useRef } from "react";
//import getLetterCountMap from "./utils/utils.js";
import wordsSolve from './components/WordsSolve';

//import TimerNew from './TimerNew';

//const solveWordsArr = ['0DRINK', '0WATER', '0APPLE'];
const solveWordsArr = wordsSolve;

let pickNumber = Math.floor(Math.random() * solveWordsArr.length);
const wordPick = solveWordsArr[pickNumber]

const arrGameRules = [
    { id: 0, letter: randomLetrs(1), state: "TileStart" },
    { id: 1, letter: wordPick[1], state: "TileStart" },
    { id: 2, letter: wordPick[2], state: "TileStart" }, { id: 3, letter: wordPick[3], state: "TileStart" },
    { id: 4, letter: wordPick[4], state: "TileStart" }, { id: 5, letter: wordPick[5], state: "TileStart" },
];

function randomLetrs(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export default function App(props) {

    const cardsRules = arrGameRules;

    //CLOSE MODAL///////////////////////////////////
    function spanClose() {
        var modalWin = document.getElementById("myModalWin");
        modalWin.style.display = "none";
    }
    // GAME SCORES
    function gameScores() {
        var GameRulesModal = document.getElementById("gameScores");
        GameRulesModal.style.display = "block";
    }
    // CLOSE GAME SCORES
    function gameScoresClose() {
        var GameRulesModal = document.getElementById("gameScores");
        GameRulesModal.style.display = "none";
    }
    // GAME RULES ///////////////////////////////////////
    function gameRules() {
        var GameRulesModal = document.getElementById("gameRulesModal");
        GameRulesModal.style.display = "block";
    }
    //CLOSE GAME RULES ///////
    function gameRulesClose() {
        var GameRulesModal = document.getElementById("gameRulesModal");
        GameRulesModal.style.display = "none";
    }
    // REFRESH PAGE///////////////////////////////////////
    function refreshPage() {
        window.location.reload();
    }

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

            <div className="uiHolder">
                <div className="buttonHolder">
                     {/* <button className="buttonGameRules" id="gameRules" onClick={gameScores}>Scores</button> */}
                    <button className="buttonGameRules" id="gameRules" onClick={gameRules}>Game Rules</button>
                    <button className="buttonPlay" onClick={() => { refreshPage() }}> Play Again </button>
                </div>
                <div>
                <h1 id="timer">Timer: {props.timer}</h1>
                <h1>Moves: {props.moves1}</h1>
                </div>
            </div>

            {/* <div>
                <h1 id="timer">Timer: {props.timer}</h1>
            </div> */}

            {/* ///////////////////// MODAL SCORES/////////////////////////////////////////////*/}
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            <div id="gameScores" className="modal">
                <div className="modal-content">
                    <span onClick={gameScoresClose} className="close">&times;</span>
                    <h2>1. {convert(time)}</h2>
                    <h1>Moves: {props.moves1}</h1>

                </div>
            </div>

            {/* ///////////////////// MODAL WIN////////////////////////////////////////////////*/}
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            <div id="myModalWin" className="modal">
                <div className="modal-content">
                    <span onClick={spanClose} className="close">&times;</span>
                    <h2>Congratulations you won in</h2>
                    <h1 id="timer">Time: {props.timer}</h1>
                    <h1>Moves: {props.moves1}</h1>
                </div>
            </div>

            {/*//////////////////// GAME RULES ////////////////////////////////////////////////*/}
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            <div id="gameRulesModal" className="modal">
                <div className="modal-content">
                    <span onClick={gameRulesClose} className="close">&times;</span>
                    <h2>How to Play</h2>
                    <h3>To win, the board has to look like example below.</h3>
                    <h3>Letter in correct spot:</h3>
                    <h3>tile = green</h3>
                    <h3>Letter in wrong spot:</h3>
                    <h3>tile = yellow</h3>
                    <h3>Letter not in word:</h3>
                    <h3>tile = gray</h3>
                    <div className="boardGameRules">
                        {cardsRules.map((num, i) => {
                            if (num.id === 0) {
                                return <div className="tileBlankSmall" key={num.id} />;
                            }
                            for (let i = 0; i < wordPick.length; i++) {

                                const solChar = wordPick[i];

                                if (cardsRules[i].letter === solChar) {
                                    cardsRules[i].state = 'tileGreenSmall'
                                }
                            }
                            return (
                                <div className={num.state} key={num.id}>
                                    <h4 className="letter"> </h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}