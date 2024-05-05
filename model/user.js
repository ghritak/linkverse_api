import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_photo: {
    type: String,
  },
  banner_photo: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  theme: {
    type: String,
  },
});

const User = mongoose.model('user', userSchema);
