import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String
});

const UserMessage = mongoose.model('UserMessage', userSchema);
export default UserMessage;