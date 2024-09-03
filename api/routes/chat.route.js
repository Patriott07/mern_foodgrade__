import { getChats, postChat, getGroup, getDetailGroup} from '../controllers/chat.controller.js';
import express from 'express';


const router = express.Router();

router.get('/chats/:room', getChats);
router.get('/groups', getGroup);
router.get('/group/:id', getDetailGroup);
router.post('/chat/push', postChat);

export default router;