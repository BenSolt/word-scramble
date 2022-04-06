import React from "react";

const Notes = (props) => {
  console.log(props);
  return (
    <div className="note-list">
      {props.scoresList.map((note) => {
        return (
          <div className="note" key={note.id}>
            <h2>{note.time}</h2>
          </div>
        );
      })}
    </div>
  );
};
export default Notes;