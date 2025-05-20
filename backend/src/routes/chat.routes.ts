import express from 'express';
import { chatController } from '../controllers/chat.controller';

const router = express.Router();

router.post('/', chatController.handleChatMessage);

export default router;