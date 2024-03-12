import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Not a valid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('users', UserSchema);
