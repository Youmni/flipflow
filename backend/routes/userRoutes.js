import express from "express";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import mysql from "mysql2";
import dotenv from "dotenv";
import validateUser from "../middleware/validateUser.js";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const userController = new UserController(connection);

const router = express.Router();

router.post("/register", validateUser, (req, res) =>
  userController.createUser(req, res)
);
router.put(
  "/update/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  validateUser,
  (req, res) => userController.updateUser(req, res)
);
router.patch(
  "/update/password/:id",
  (req, res, next) => AuthController.authenticateToken(req, res, next),
  validateUser,
  (req, res) => userController.updatePassword(req, res)
);
router.get("/:id", (req, res) => userController.getUserById(req, res));

export default router;
