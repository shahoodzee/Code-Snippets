import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../util/Common/hashing.js';
import { getUserByEmail, IsOldUser, getUserById, getAllUsers } from '../util/Common/user.js';
import UserMessage from '../models/userMessage.js';
import { generateToken, setTokenCookie, clearTokenCookie } from '../util/Common/tokenization.js';

export const signout = async (req, res) => {
  await clearTokenCookie(res);
  return res.status(200).json({"message": "User Logout"});
}

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserMessage.findOne({ email });
      if (user != null) {
          const oldUser = await getUserByEmail(email);

          if (await comparePassword(password, oldUser.password)) {
              const token = await generateToken(oldUser);
              await setTokenCookie(res, token);

              return res.status(200).json({ "User Authenticated": true, "token": token });
          } else {
              return res.status(400).json({ error: "Password is incorrect" });
          }
      } else {
          return res.status(400).json({ error: " {} Email not found" });
      }
  } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  try {

    if (await IsOldUser(user.email)) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    user.password = await hashPassword(user.password);
    
    const newUser = new UserMessage(user);
    await newUser.save()

    const token = await generateToken(newUser);
    await setTokenCookie(res, token);
    
    res.status(201).json({ newUser, token });
 
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const user = await UserMessage.findById(id);
    return res.status(200).json(user);
  
  } catch (error) {
    return res.status(404).json({ message: "Something Went Wrong" });
  }
};

export const getUsers = async (req,res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);

  } catch (error) {
    console.log(error);
  }
};

