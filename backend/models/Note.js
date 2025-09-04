const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  subject: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  file_url: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Note', NoteSchema);