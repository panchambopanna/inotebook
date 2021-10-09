const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get all notes for a particular user from using 'GET: api/notes/fetchallnotes'. Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => { //using fetchuser to get token
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        res.status(500).send("Internal server error");
    }

})

//Route 2: Add notes for a user from using 'POST: api/notes/addnote'. Login required

router.post('/addnote', fetchuser,[
    body('title', "Title cannot be blank").isLength(1), 
    body('description', 'Description cannot be blank').isLength(1)
], async (req, res) => { //using fetchuser to get token
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {title, description, tag} = req.body;

    try {
        const note = new Notes ({
            title,description,tag,user:req.user.id
        })
        const savedNote = await note.save();
        res.send(savedNote);

    } catch (error) {
        res.status(500).send("Internal server error");
    }

})

//Route 3: Update notes for a user from using 'PUT: api/notes/updatenote'. Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {title,description,tag} = req.body;

    //creating a new note object from the user input
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    try {
        
    //check if note id is valid
    let note = await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send('Note not found')};

    //Check if the note belongs to the user updating the note
    if(note.user.toString() !== req.user.id){return res.status(401).send('Unauthorised user')};

    //Update notes
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.send(note);
    
    }catch (error) {
        res.status(500).send("Internal server error");
    }

})

module.exports = router;