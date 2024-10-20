import express from "express";
import { signUp, logOut, getUser, getUsers, logIn, getEmailConfirmation, getUserDetails, resetPassword } from "../controllers/user.js";
import { verifyToken } from "../common/tokenization.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get('/all', verifyToken, getUsers);
router.get('/getUser', verifyToken, getUser); //logged in user
router.get('/getUserDetails/:id', verifyToken, getUserDetails); //other user
router.post('/resetPassword', resetPassword);
router.get('/emailConfirmation', verifyToken, getEmailConfirmation);
router.post('/create', upload.single('image'), signUp);
router.post('/signIn', logIn);
router.post('/signOut', logOut);


export default router;