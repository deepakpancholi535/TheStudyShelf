const Note = require('../models/Note');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @route   GET /api/notes
// @desc    Get all notes
// @access  Public
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('owner', ['name', 'branch', 'semester']);
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/notes/view/:id
// @desc    View a single note by streaming its content
// @access  Public
exports.viewNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Fetch the file content from Cloudinary
    const fileResponse = await axios.get(note.file_url, {
      responseType: 'stream',
      headers: {
        'Accept': 'application/pdf, application/msword' // Example, can be customized
      }
    });

    // Set the Content-Disposition header to 'inline'
    res.setHeader('Content-Disposition', `inline; filename="${note.title}.pdf"`);
    res.setHeader('Content-Type', fileResponse.headers['content-type']);

    // Pipe the stream from Cloudinary to our response,
    // so the browser displays the file directly.
    fileResponse.data.pipe(res);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/notes
// @desc    Upload a new note
// @access  Private
exports.uploadNote = async (req, res) => {
  try {
    const { title, description, category, subject, branch, semester } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    const uniqueId = `note-${Date.now()}`;
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'notes-app',
      public_id: uniqueId,
      resource_type: 'auto',
    });

    const newNote = new Note({
      title,
      description,
      category,
      subject,
      branch,
      semester,
      file_url: result.secure_url,
      owner: req.user.id
    });

    const note = await newNote.save();
    res.json({ msg: 'Note uploaded successfully', note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/notes/my-notes
// @desc    Get all notes for a specific user
// @access  Private
exports.getUsersNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE /api/notes/:id
// @desc    Delete a note by ID
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};