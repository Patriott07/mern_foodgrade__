import {deleteWeeklyChat} from '../controllers/chat.controller.js';
import cron from 'node-cron';


cron.schedule('0 0 * * 7', () => {
    deleteWeeklyChat();
});


