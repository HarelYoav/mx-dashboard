const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const User = require('../models/userModel');

const getUserNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find({"user.id": req.user._id});

    if (notes.length !== 0) {
        res.json(notes);

    } else {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        res.json([{title: 'add your first note', content: 'add your first note', createdAt: date}]);
    }

});

const createNote = asyncHandler(async (req, res) => {

    const {title, content, isPrivate} = req.body;

    if(!title || !content) {
        res.status(400).send('Please fill title and content');
        throw new Error('Please fill title and content');

    } else {
        const note = new Note({user: {id:req.user._id, name: req.user.name}, title, content, isPrivate});

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }

});

const getNoteById = asyncHandler( async (req, res) => {

    const note = await Note.findById(req.params.id);

    if (note) {

        res.json(note);

    } else {

        res.status(404).json({message: 'Note not found'});
    }

});

const updateNote = asyncHandler( async (req, res) => {

    const {title, content, isPrivate } = req.body;
    const note = await Note.findById(req.params.id);
    if (note) {
        if (note.user.id.toString() !== req.user._id.toString()) {

            res.status(401).send('your not the owner of this note');
            throw new Error('your not the owner of this note');

        } else {
            note.title = title;
            note.content = content;
            note.isPrivate = isPrivate;

            const updatedNote = note.save();
            res.json(updatedNote);
        }

    } else {
        res.status(404).send('cant find the note with id: ' + req.params.id);
            throw new Error('cant find the note with id: ' + req.params.id);
    }
});

const deleteNote = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        if (note.user.toString() !== req.user._id.toString()) {

            res.status(401).send('your not the owner of this note');
            throw new Error('your not the owner of this note');

        } else {

            await note.remove();
            res.json({ message: 'Note Removed' });
        }

    } else {
        res.status(404).send('cant find the note with id: ' + req.params.id);
            throw new Error('cant find the note with id: ' + req.params.id);
    }
});


const notePublicList = asyncHandler( async (req, res) => {

    let notesWithUserDetails = [];

    const notes = await Note.find({isPrivate: false});

    for(var i = 0; i< notes.length; i++) {
        const user = await User.findById(notes[i].user.id);
        notesWithUserDetails.push({user: user, note: notes[i]});
    }

    if (notesWithUserDetails) {
        res.json(notesWithUserDetails);
    } else {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        res.json([{title: 'no public notes yet', content: 'no public notes yet', createdAt: date}]);
    }
})

module.exports = { getUserNotes, createNote, getNoteById, updateNote, deleteNote, notePublicList};