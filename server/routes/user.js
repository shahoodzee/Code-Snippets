import express from "express";
import { signin, signup, signout, getUser, getUsers } from "../controllers/user.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', signup);
router.post('/signin', signin);
router.post('/signout', signout);


export default router;