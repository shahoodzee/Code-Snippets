import mongoose from "mongoose";
import baseSchema from "./baseSchema.js"

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  emailConfirmed: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  profileImage: String,
  imagePublicId: String,
});

userSchema.add(baseSchema);

const User = mongoose.model('User', userSchema, 'User');
export default User;
