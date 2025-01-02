import express from 'express';
import CardSetController from '../controllers/CardSetController.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import validateCardSet from '../middleware/validateCardSet.js';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const cardSetController = new CardSetController(connection);

const router = express.Router();

router.post('/create/:id', validateCardSet, (req, res) => cardSetController.createCardSet(req, res));
router.post('/tag/add', (req, res) => cardSetController.addTagToCardSet(req, res));
router.delete('/tag/remove', (req, res) => cardSetController.removeTagFromCardSet(req, res));
router.delete('/delete/:id', (req, res) => cardSetController.deleteCardSet(req, res));
router.get('/all', (req, res) => cardSetController.getAllCardSets(req, res));
router.get('/:id', (req, res) => cardSetController.getCardSetById(req, res));
router.get('/cards/:id', (req, res) => cardSetController.getCardSetWithCardsById(req, res));

export default router;