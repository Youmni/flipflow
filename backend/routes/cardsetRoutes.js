import express from "express";
import CardSetController from "../controllers/CardSetController.js";
import AuthController from "../controllers/AuthController.js";
import mysql from "mysql2";
import dotenv from "dotenv";
import validateCardSet from "../middleware/validateCardSet.js";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const cardSetController = new CardSetController(connection);

const router = express.Router();

router.post(
  "/create/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  validateCardSet,
  (req, res) => cardSetController.createCardSet(req, res)
);
router.put(
  "/update/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  (req, res) => cardSetController.updateCardSet(req, res)
);
router.delete(
  "/delete/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  (req, res) => cardSetController.deleteCardSet(req, res)
);
router.patch(
  "/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  (req, res) => cardSetController.patchVisability(req, res)
);
router.get("/", (req, res) =>
  cardSetController.getAllCardSetsWithSearch(req, res)
);
router.get("/all", (req, res) => cardSetController.getAllCardSets(req, res));
router.get("/:userId", (req, res) =>
  cardSetController.getCardSetByUserId(req, res)
);
router.get("/cards/:id", (req, res) =>
  cardSetController.getCardSetWithCardsById(req, res)
);

export default router;
