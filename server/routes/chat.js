import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat )

export default router;