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

module.exports = router;