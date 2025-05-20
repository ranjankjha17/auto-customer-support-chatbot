import express from 'express';
import chatController from '../controllers/chat.controller';

const router = express.Router();

router.post('/', chatController.handleChatMessage);
router.get('/history', chatController.getChatHistory);

export default router;