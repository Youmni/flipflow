import express from 'express';
import validateUser from '../middleware/validateUser.js';
import {createUser,  getUserById,  updatePassword,  updateUser} from '../controllers/UserController.js';

const router = express.Router();

router.post("/register", validateUser, createUser);
router.put("/update/:id", validateUser, updateUser);
router.patch("/update/password/:id", validateUser, updatePassword);
router.get("/:id", getUserById);

export default router;
