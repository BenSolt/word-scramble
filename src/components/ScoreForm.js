import React, { useState } from "react";

const NoteForm = (props) => {
  const [note, setNote] = useState({ time: ""});
  const changeHandler = (event) => {
    //computed properties
    console.log(event.target.value);
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    const newNote = {
      ...note,
      id: Date.now()
    };
    props.addNewNote(newNote);
    setNote({ time: ""});
  };
  return (
    <div className="formholder">
      <form onSubmit={submitForm}>
        <label>Recipe Name</label>
        <input
          type="text"
          name="time"
          placeholder="Recipe Name"
          value={note.time}
          onChange={changeHandler}
        />

        <button type="submit">Add note</button>
      </form>
    </div>
  );
};

export default NoteForm;
