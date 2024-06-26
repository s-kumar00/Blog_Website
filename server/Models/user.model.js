const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  }
},{timestamps: true});

module.exports = mongoose.model("User_Blog", userSchema);


