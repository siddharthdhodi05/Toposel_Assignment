import express from "express";
import {
  loginUser,
  registerUser,
  searchUser,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/search").post(isAuthenticated, searchUser);

export default router;
