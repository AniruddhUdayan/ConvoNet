import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChats, getMyGroups, newGroupChat, removeMembers , leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMembersValidator, deleteChatValidator, getChatDetailsValidator, getMessagesValidator, leaveGroupValidator, newGroupValidator, removeMembersValidator, renameGroupValidator, sendAttachmentsValidator, validate } from "../lib/validators.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/new", newGroupValidator() , validate , newGroupChat )

router.get('/my' , getMyChats)

router.get('/my/groups' , getMyGroups)

router.put('/addmembers' , addMembersValidator() , validate , addMembers)

router.delete('/removemembers' , removeMembersValidator() , validate , removeMembers)

router.delete("/leave/:id" , leaveGroupValidator() , validate , leaveGroup)

router.post('/message' , attachmentsMulter , sendAttachmentsValidator() , validate , sendAttachments)

router.get('/messages/:id' , getMessagesValidator() , validate , getMessages)

//get chat details , rename , delete
router.route('/:id').get(getChatDetailsValidator() , validate , getChatDetails).put(renameGroupValidator() , validate , renameGroup).delete(deleteChatValidator() , validate , deleteChat);

export default router;