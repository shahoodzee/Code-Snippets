import mongoose from 'mongoose';
import { hashPassword, comparePassword } from '../common/hashing.js';
import { getUserByEmail, IsOldUser, getUserById, getAllUsers, isUserEmailConfirmed } from '../common/user.js';
import User from '../models/User.js';
import { generateToken, setTokenCookie, clearTokenCookie } from '../common/tokenization.js';
import { ApiResponse } from '../common/ApiResponse.js';
import { uploadImage } from '../common/cloudinary.js';
import { sendPasswordResetEmail } from '../common/emailService.js';

export const logOut = async (req, res) => {
  await clearTokenCookie(res);
  return res.status(200).json(ApiResponse(true, "User Logged Out", null));
}

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

      if (user != null) {
        const oldUser = await getUserByEmail(email);
        
        if (await comparePassword(password, oldUser.password)) {
          const token = await generateToken(oldUser);
          return res.status(200).json(ApiResponse(true, "User Logged In", token));
        }
        else {
          return res.status(404).json(ApiResponse(false, "Incorrect Password", null));
        }
      } 
      else {
        return res.status(404).json(ApiResponse(false, "User does not exist", null));
      }
  } catch (err) {
      res.status(500).json(ApiResponse(false, err.message, null));
  }
};

export const signUp = async (req, res) => {
  const user = req.body;
  const image = req.file;
  try {

    if (await IsOldUser(user.email)) {
      return res.status(400).json(ApiResponse(false, "Email Already Exists", null));
    }
    user.password = await hashPassword(user.password);

    if (req.file == null) {
      return res.status(400).json(ApiResponse(false, "Image not uploaded", null));      
    }
    const result = await uploadImage(image);
    if (!result) {
      return res.status(400).json(ApiResponse(false, "Image not uploaded to cloudinary", null));
    }
    user.profileImage = result.secure_url;
    user.imagePublicId = result.public_id;

    const newUser = new User(user);
    await newUser.save()
    
    res.status(201).json(ApiResponse(true, "User Created", null));
 
  } catch (error) {
    res.status(500).json(ApiResponse(false, error.message, null));
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.cdui;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(ApiResponse(false,"User Not Found",null));

    const user = await getUserById(userId);
    return res.status(200).json(ApiResponse(true, "User Fetched", user));

  } catch (error) {
    return res.status(404).json(ApiResponse(false, error.message, null));
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(ApiResponse(false,"User Not Found",null));

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ApiResponse(false, "User Not Found", null));
    }
    const userDetails = {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
    }
    return res.status(200).json(ApiResponse(true, "User Fetched", userDetails));
  }
  catch (error) {
    return res.status(404).json(ApiResponse(false, error.message, null));
  }
}

export const getUsers = async (req,res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({success: true, message: "All Users fecthed!", data: users});

  } catch (error) {
    console.log(error);
  }
};

export const getEmailConfirmation = async (req, res) => {
  try {
    const userId = req.user.cdui;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json(ApiResponse(false, "User not found", null));

    const user = await getUserById(userId);
    return res.status(200).json(ApiResponse(true, "Email Confirmation", user.emailConfirmed));  

  } catch (error) {
    return res.status(404).json(ApiResponse(false, error.message, null));
  }
}

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    
    if (!email) {
      return res.status(404).json(ApiResponse(false, "email not found", null));
    }

    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json(ApiResponse(false, "User not found", null));
    }

    const token = await generateToken(user);
    
    const emailData = {
      receiver: user.email,
      link: `http://localhost:3000/resetPassword?token=${token}`

    }
    await sendPasswordResetEmail(emailData);
    return res.status(200).json(ApiResponse(true, "Password reset email sent", null));
  }
  catch (error) {
    return res.status(404).json(ApiResponse(false, error.message, null));
  }
}
