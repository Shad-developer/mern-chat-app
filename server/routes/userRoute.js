import express from "express";
const router = express.Router();
import { getUserforSidebar } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

router.get("/", protectRoute, getUserforSidebar);

export default router;
