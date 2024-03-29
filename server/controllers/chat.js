import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";

const newGroupChat = async (req, res , next) => {
    const {name , members} = req.body;

    if(members.length < 2){
        return next(new ErrorHandler("Please add atleast 2 members" , 400));
    }

    const allMembers = [...members , req.user];

    await Chat.create({
        name,
        groupChat : true,
        creator : req.user,
        members : allMembers,
    })

    emitEvent(req , ALERT , allMembers , `You have been added to a new group chat ,  ${name}`)
    emitEvent(req , REFETCH_CHATS , members);

    return res.status(201).json({
        success:true,
        message:"Group chat created successfully"
    })
}

export { newGroupChat };