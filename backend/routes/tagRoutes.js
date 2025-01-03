import express from "express";
import TagController from "../controllers/TagController.js";
import AuthController from "../controllers/AuthController.js";
import mysql from "mysql2";
import dotenv from "dotenv";
import validateTag from "../middleware/validateTag.js";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const tagController = new TagController(connection);

const router = express.Router();

router.post(
  "/create",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  validateTag,
  (req, res) => tagController.createTag(req, res)
);
router.delete(
  "/delete/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  (req, res) => tagController.deleteTag(req, res)
);
router.get("/all", (req, res) => tagController.getAllTags(req, res));
router.get("/:id", (req, res) => tagController.getTagsById(req, res));
router.get("/", (req, res) => tagController.getTagsByNameContaining(req, res));

export default router;
