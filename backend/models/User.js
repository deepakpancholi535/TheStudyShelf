const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
