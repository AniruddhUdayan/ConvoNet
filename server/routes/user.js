import express from 'express';
import { getMyProfile, login, logout, newUser, searchUser } from '../controllers/user.js';
import {singleAvatar } from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/new', singleAvatar , newUser)

//Routes after this will use this middleware to check if user is authenticated
router.use(isAuthenticated)

router.get('/profile',getMyProfile);

router.get('/logout',logout)

router.get('/search',searchUser)



export default router;