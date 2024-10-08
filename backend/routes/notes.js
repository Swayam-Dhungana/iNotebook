const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetctuser = require("../middlewares/fetchuser");
const { body, validationResult } = require("express-validator");



//Add a new note
router.post(
  "/addnote",
  fetctuser,
  body("title").exists(),
  body("description").isLength({
    min: 1,
  }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({error: error.array()});
    }
    try {
      const { title, description, tag } = req.body;
      const note = await Notes.create({
        title: title,
        description: description,
        tag: tag,
        user:req.user.id
      });
      res.json(note);
    } catch (error) {
        res.status(400).send("Internal server error");
    }
  }
);

//Get all the notes
router.get("/fetchallnotes", fetctuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id});
    res.json(notes);
  } catch (error) {
    res.status(400).send("Internal server error");
  }
});


//Update an existing note
router.put('/updatenote/:id', fetctuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send('Note not found');
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send('Access denied');
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json({note});
} )


// Deleting a note

router.delete('/deletenote/:id',fetctuser ,async(req,res)=>{
    const note=await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Note not found")};
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Access Denied");
    }
    const deleteUser=await Notes.findByIdAndDelete(req.params.id);
    return res.send("Deleted record");
})

module.exports = router;
