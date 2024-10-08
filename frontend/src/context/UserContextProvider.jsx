import React, { useState } from "react";
import UserContext from "./createContext";

const UserContextProvider=({children})=>{
  const host=`http://localhost:3000`;
    const [notes, setNotes] = useState([])
      
    //   GET NOTE
      const getNotes=async()=>{
        const response=await fetch(`${host}/notes/fetchallnotes`,{
          method: 'GET',
          headers:{
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmZDRmYjIwNDc0N2VjNzRhMTU5ZDAxIn0sImlhdCI6MTcyNzg3NzA1OX0.eR1SuGJ9GqYOC8oyMUMkYjDmqHIN9um8JbEZ6QdEygQ"
          }
        }
        )
        const json=await response.json()
        setNotes(json)
        // To do api call
      }



    // ADD NOTE 


      const addNote=async(title, description, tag)=>{
        
        const response=await fetch(`${host}/notes/addnote`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmZDRmYjIwNDc0N2VjNzRhMTU5ZDAxIn0sImlhdCI6MTcyNzg3NzA1OX0.eR1SuGJ9GqYOC8oyMUMkYjDmqHIN9um8JbEZ6QdEygQ"
          },
          body: JSON.stringify({title, description, tag})
        }
        )
        const note=await response.json()
        setNotes(notes.concat(note))
        // console.log(response)
        // To do api call
      }



    // DELETE NOTE 

      const deleteNote=async(id)=>{
        const response=await fetch(`${host}/notes/deletenote/${id}`,{
          
          method: 'DELETE',
          headers:{
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmZDRmYjIwNDc0N2VjNzRhMTU5ZDAxIn0sImlhdCI6MTcyNzg3NzA1OX0.eR1SuGJ9GqYOC8oyMUMkYjDmqHIN9um8JbEZ6QdEygQ"
          }
}
        )
        //TO DO ADD API
        const newNote=notes.filter((note)=>{
            return note._id!==id
        })
        setNotes(newNote)
      }


  
      //EDIT NOTE

  
      const editNote=async(id,title,description,tag)=>{
        // API

        const response=await fetch(`${host}/notes/updatenote/${id}`,{
          method: 'PUT',
          headers:{
            "Content-type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmZDRmYjIwNDc0N2VjNzRhMTU5ZDAxIn0sImlhdCI6MTcyNzg3NzA1OX0.eR1SuGJ9GqYOC8oyMUMkYjDmqHIN9um8JbEZ6QdEygQ"
          },
          body: JSON.stringify({title, description, tag})
        }
        )
        let newNote=JSON.parse(JSON.stringify(notes));
        //Logic for edit
        for (let i = 0; i < newNote.length; i++) {
          const element = newNote[i];
          if(element._id===id){
            newNote[i].title =title,
            newNote[i].description= description,
            newNote[i].tag= tag
            break;
          }
        }
        setNotes(newNote);
      }


    return (

    <UserContext.Provider value={{notes,getNotes, addNote,deleteNote,editNote}}>
        {children}
    </UserContext.Provider>

    )

}


export default UserContextProvider;