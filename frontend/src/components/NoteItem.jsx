import React, { useContext } from "react";
import UserContext from "../context/createContext";

const NoteItem = (props) => {
  const { notes, updateNote } = props;
  const {deleteNote}=useContext(UserContext);
  const handleDelete=()=>{
    const id=notes._id;
    deleteNote(id);
  }
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">
            {notes.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
            updateNote(notes)
          }}></i> 
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
