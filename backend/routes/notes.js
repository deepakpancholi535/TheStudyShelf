
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notesController = require('../controllers/notesController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// @route   GET /api/notes
// @desc    Get all notes
// @access  Public
router.get('/', notesController.getNotes);

// @route   GET /api/notes/view/:id
// @desc    View a note by ID
// @access  Public
router.get('/view/:id', notesController.viewNote);

// @route   POST /api/notes
// @desc    Upload a new note
// @access  Private
router.post('/', auth, upload.single('noteFile'), notesController.uploadNote);

// @route   GET /api/notes/my-notes
// @desc    Get all notes for a specific user
// @access  Private
router.get('/my-notes', auth, notesController.getUsersNotes);

// @route   DELETE /api/notes/:id
// @desc    Delete a note by ID
// @access  Private
router.delete('/:id', auth, notesController.deleteNote);

module.exports = router;
