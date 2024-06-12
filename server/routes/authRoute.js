import express from "express";
const router = express.Router();
import { getSignup, getLogin, Logout } from "../controllers/authController.js";

router.post("/signup", getSignup);
router.post("/login", getLogin);
router.post("/logout", Logout);

export default router;
