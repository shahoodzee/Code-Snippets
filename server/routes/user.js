import express from "express";

import { signin, signup, signout } from "../controllers/user.js";

const router = express.Router();
router.post("/signin", signin);
router.post('/signup', signup);
router.get('/signout', signout);

export default router;