const express = require('express');
const { getUserNotes, createNote, getNoteById, updateNote, deleteNote, notePublicList } = require('../controllers/noteControllers');
const { protectData } = require('../middlewares/authMiddleware');



const router = express.Router();

router.route('/').get(protectData, getUserNotes);
router.route('/create').post(protectData, createNote);
router.route('/public').get(protectData, notePublicList)
router.route('/:id').get(protectData, getNoteById).put(protectData, updateNote ).delete(protectData, deleteNote);



module.exports = router;