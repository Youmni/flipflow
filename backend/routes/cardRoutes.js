import express from 'express';
import CardController from '../controllers/CardController.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import validateCard from '../middleware/validateCard.js';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const cardController = new CardController(connection);

const router = express.Router();

router.post('/create/:id', validateCard, (req, res) => cardController.createCard(req, res));
router.put('/:set_id/:id', (req, res) => cardController.updateCard(req, res));
router.delete('/:set_id/:id', (req, res) => cardController.deleteCard(req, res));
router.get('/:set_id/:id', (req, res) => cardController.getCardById(req, res));

export default router;