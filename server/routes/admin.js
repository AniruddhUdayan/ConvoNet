import express from 'express';
import { getAllChats, getAllUsers, getAllMessages } from '../controllers/admin.js';

const router = express.Router();


router.get('/');

router.post('/verify')

router.get('/logout')

router.get('/users' , getAllUsers)

router.get('/chats' , getAllChats)

router.get('/messages' , getAllMessages)

router.get('/stats')

export default router;