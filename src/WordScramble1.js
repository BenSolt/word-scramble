import { useState } from "react";
//import getLetterCountMap from "./utils/utils.js";
import "./AppWordScramble.css";


const solveWord = "0DRINK";
const solveWordsArr = ['0DRINK', '0WATER', '0APPLE'];
let pickNumber = Math.floor(Math.random() * solveWordsArr.length);
const wordPick = solveWordsArr[pickNumber]

const arr = [
    { id: 0, letter: randomLetrs(1), state: "TileStart" }, 
    { id: 1, letter: wordPick[1], state: "TileStart" },
    { id: 2, letter: wordPick[2], state: "TileStart" }, { id: 3, letter: wordPick[3], state: "TileStart" },
    { id: 4, letter: wordPick[4], state: "TileStart" }, { id: 5, letter: wordPick[5], state: "TileStart" },
    { id: 6, letter: randomLetrs(1), state: "TileStart" }, { id: 7, letter: randomLetrs(1), state: "TileStart" },
    { id: 8, letter: randomLetrs(1), state: "TileStart" }
];
const SIZE = 3;

const arr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

////////////////////////////////////////

function randomLetrs(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (8 - 1) + 1);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
//shuffle(arr);
//console.log("Arr Shuffle:", arr)

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

export default function App() {

    const [blankIndex, setBlankIndex] = useState(arr[0].id);
    const [cards, setCards] = useState(arr);

    const handleCardClick = (targetIndex) => {

        if (canSwap(targetIndex, blankIndex)) {
            setCards((cards) => swap(cards, targetIndex, blankIndex));
            setBlankIndex(targetIndex);
        }
    };

    //////////////////////////////////
    function checkWin2() {
        let currentWordArr = []

        for (let i = 0; i < wordPick.length; i++) {
            const solChar = wordPick[i];

            if (cards[i].letter === solChar) {
                currentWordArr.push(cards[i].letter)
                //console.log('test', currentWordArr);

                let aa = currentWordArr.join()
                let currentWordString = aa.replaceAll(',', '');
                let wordzNoZero = wordPick.replaceAll('0', '');

                if (currentWordString === wordzNoZero && cards[0].id === arr2[0]) {
                //if (currentWordString === wordzNoZero) {
                    //console.log('win test')
                }
            }
        }
    }

    // function checkWin() {
    //     for (var i = 0; i < cards.length; i++) {
    //         if (cards[i].id !== arr2[i]) {
    //             console.log('false');
    //             return false;
    //         }     
    //     }
    //     console.log("WIN!!!!!")
    //     return true;
    // }

    return (
        <div className="App2">
            <h1>BOARD 2</h1>

            <div className="Board">
                {cards.map((num, i) => {
                    if (num.id === 0) {
                        return <div className="TileBlank" key={num.id} />;
                    }

                    let currentWordArr = []
                    for (let i = 0; i < wordPick.length; i++) {
                        const solChar = wordPick[i];
            
                        if (cards[i].letter === solChar) {
                            cards[i].state = 'TileGreen'
                            currentWordArr.push(cards[i].letter)
                        }
                        else {
                            cards[i].state = 'TileStart'
                        }
                    }

                    // for (let i = 0; i < arr.length; i++) {
                    //     if (cards[i].id === arr2[i]) {
                    //         cards[i].state = 'TileGreen'
                    //     }
                    //     else {
                    //         cards[i].state = 'TileStart'
                    //     }
                    // }
                    //checkWin();
                    checkWin2();
                    return (
                        <div className={num.state} key={num.id} onClick={() => handleCardClick(i)}>
                            <h4 className="Letter">{num.id}</h4>
                            <h1 className="Letter">{num.letter}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}