import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, newGroupChat, removeMembers , leaveGroup } from "../controllers/chat.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat )

router.get('/my' , getMyChats)

router.get('/my/groups' , getMyGroups)

router.put('/addmembers' , addMembers)

router.delete('/removemembers' , removeMembers)

router.delete("/leave/:id" , leaveGroup)

export default router;