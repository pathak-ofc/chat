import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getContacts, getChats, sendMessage, getFriends} from "../controllers/message.controller.js"; 
import arcjetMiddleware from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetMiddleware, protectRoute);

router.get("/contacts",  getContacts);
router.get("/chats",  getFriends);
router.get("/:id",  getChats);
router.post("/send/:id",  sendMessage);

export default router;