import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/createContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  // INITIALIZATION 
  const navigate=useNavigate();
  const { notes, getNotes, editNote } = useContext(UserContext);
  const [note, setNote] = useState({eid:'',etitle:'',edescription:'',etag:""})
  
const refClose=useRef(null);
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate('/login')
    }
  }, []);

  //Functions

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({eid:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };
  
  const ref = useRef(null);
  
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  const handleClick=(e)=>{
    // console.log(note)
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }
  
  return (
    <>
      <AddNote note={notes}/>


      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    name="etitle"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    name="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name="etag"
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5|| note .edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes : </h2>
        <div className="container">
        {notes.length===0 && "No notes added."}
        </div>
        {notes.map((item) => {
          return (
            <NoteItem notes={item} updateNote={updateNote} key={item._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
