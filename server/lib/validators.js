import { body, check, param, query, validationResult } from "express-validator";


const validate = (req , res , next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(error => error.msg).join(", ");
    console.log(errorMessages);
    if(errors.isEmpty()){
        return next();
    }else next(new Error(errorMessages),400);
}

const registerValidator = () => [
  body("name" , "Please Enter Name").notEmpty(),
  body("userName" , "Please Enter Username").notEmpty(),
  body("password" , "Please Enter Password").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  check("avatar").notEmpty().withMessage("Please Upload Avatar"),
];

const loginValidator = () => [
    body("userName" , "Please Enter Username").notEmpty(),
    body("password" , "Please Enter Password").notEmpty(),
    ];

const newGroupValidator = () => [
    body("name" , "Please Enter Group Name").notEmpty(),
    body("members" , "Please Enter Members").isArray({min:2 , max:100}).withMessage("Please Add Members"),
];

const addMembersValidator = () => [
    body("chatId" , "Please Enter Chat ID").notEmpty(),
    body("members" , "Please Enter Members").isArray({min:1 , max:97}).withMessage("Please Add Members"),
];

const removeMembersValidator = () => [
    body("chatId" , "Please Enter Chat ID").notEmpty(),
   body("userId" , "Please Enter User ID").notEmpty(),
];

const leaveGroupValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
    body("chatId" , "Please Enter Chat ID").notEmpty(),
    check("files").notEmpty().withMessage("Please Upload Attachments").isArray({min:1 , max:5}).withMessage("Attachments must be between 1-5")
];

const getMessagesValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
];

const getChatDetailsValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
];

const renameGroupValidator = () => [
    body("name" , "Please Enter Group Name").notEmpty(),
    body("id" , "Please Enter Chat ID").notEmpty(),
];

const deleteChatValidator = () => [
    param("id" , "Please Enter Chat ID").notEmpty(),
];

const sendRequestValidator = () => [
    body("userId" , "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
    body("requestId" , "Please Enter Request ID").notEmpty(),
    body("accept" , "Please Add Accept").notEmpty().isBoolean().withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
    body("secretKey" , "Please Enter Secret Key").notEmpty(),
];

export { validate ,  registerValidator , loginValidator ,newGroupValidator , addMembersValidator , removeMembersValidator , leaveGroupValidator , sendAttachmentsValidator , getMessagesValidator , getChatDetailsValidator , renameGroupValidator , deleteChatValidator , sendRequestValidator , acceptRequestValidator , adminLoginValidator};
