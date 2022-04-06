import React, { useState } from "react";

import Scores from "./components/Scores";
import ScoreForm from "./components/ScoreForm";
//mimic fetching data from an API
import data from "./components/data";

function WordScrambleScores() {
  const [scores, setScores] = useState(data);
  const addNewScore = (score) => {
    setScores([...scores, score]);
  };
  
  return (
    <div className="App">
      <h1>My Recipes</h1>
      <ScoreForm addNewNote={addNewScore} />
      <Scores scoresList={scores} />
    </div>
  );
}
export default WordScrambleScores;