import express from 'express';
import { getAllChats, getAllUsers, getAllMessages, getDashboardStats, adminLogin, adminLogout, getAdminData } from '../controllers/admin.js';
import { adminLoginValidator, validate } from '../lib/validators.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();


router.post('/verify' , adminLoginValidator() , validate , adminLogin)

router.get('/logout' , adminLogout)

router.use(isAdmin)

router.get('/' , getAdminData);

router.get('/users' , getAllUsers)

router.get('/chats' , getAllChats)

router.get('/messages' , getAllMessages)

router.get('/stats' , getDashboardStats)

export default router;