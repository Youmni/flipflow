import express from 'express';
import validateUser from '../middleware/validateUser.js';
import createUser from '../controllers/userController.js';

const router = express.Router();

router.post("/register", validateUser, createUser);

export default router;
