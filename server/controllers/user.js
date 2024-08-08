import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from '../util/Common/hashing.js';
import { getUserByEmail, IsOldUser } from '../util/Common/user.js';
import UserMessage from '../models/userMessage.js';

export const signout = async (req, res) => {
  return res.status(200).json({"message": "User Logout"});
}


export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
      if (!await IsOldUser(email)) {
          const oldUser = await getUserByEmail(email);  
          
          if (await comparePassword(password, oldUser.password)) {
              return res.status(200).json({ "message": "User Authenticated" });
          } else {
              return res.status(400).json({ error: "Password is incorrect" });  
          }
      } else {
          return res.status(400).json({ error: "Email not found" });
      }
  } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
  }
};


export const signup = async (req, res) => {
  const user = req.body;
  try {

    if (!await IsOldUser(user.email)) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    user.password = await hashPassword(user.password);
    
    // const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    const token = "token"
    const newUser = new UserMessage(user);
    await newUser.save()
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};