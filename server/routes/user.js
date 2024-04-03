import express from 'express';
import { acceptRequest, getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendRequest } from '../controllers/user.js';
import {singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validate } from '../lib/validators.js';

const router = express.Router();

router.post('/login',loginValidator() , validate , login);

router.post('/new', singleAvatar , registerValidator() , validate , newUser)

//Routes after this will use this middleware to check if user is authenticated
router.use(isAuthenticated)

router.get('/profile',getMyProfile);

router.get('/logout',logout)

router.get('/search',searchUser)

router.put('/sendrequest' , sendRequestValidator() , validate , sendRequest)

router.put('/acceptrequest' , acceptRequestValidator() , validate , acceptRequest)

router.get('/notifications', getAllNotifications)

router.get('/friends', getMyFriends)



export default router;