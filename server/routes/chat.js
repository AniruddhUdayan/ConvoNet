import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, newGroupChat, removeMembers , leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupChat )

router.get('/my' , getMyChats)

router.get('/my/groups' , getMyGroups)

router.put('/addmembers' , addMembers)

router.delete('/removemembers' , removeMembers)

router.delete("/leave/:id" , leaveGroup)

router.post('/message' , attachmentsMulter , sendAttachments)

router.get('/messages/:id' , getMessages)

//get chat details , rename , delete
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;