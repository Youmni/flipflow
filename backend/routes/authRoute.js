import express from 'express';
import AuthController from '../controllers/AuthController.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import validateUser from '../middleware/validateUser.js';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const authController = new AuthController(connection);

const router = express.Router();

router.post('/', validateUser, (req, res) => authController.login(req, res));
router.post('/refresh-token', (req, res) => AuthController.getNewAccessToken(req, res));

export default router;