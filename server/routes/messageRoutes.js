import express from "express";
import { getMessages, getUserForSideBar, markMessageAsSeen, sendMessage, } from "../controllers/messageController.js";
import protectedRoute from "../middlewares/auth.js";
const messageRouter = express.Router();

// Message routes
messageRouter.get("/users", protectedRoute, getUserForSideBar);
messageRouter.get("/:id", protectedRoute, getMessages);
messageRouter.put("/mark/:id", protectedRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectedRoute, sendMessage);

export default messageRouter;