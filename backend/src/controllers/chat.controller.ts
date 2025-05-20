import { Request, Response } from 'express';
import chatService from '../services/chat.service';

export default {
  async handleChatMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const { response } = await chatService.processQuery(message);
      
      // Stream the response
      res.setHeader('Content-Type', 'text/plain');
      res.write(response);
      res.end();
      
    } catch (error) {
      console.error('Chat Controller Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getChatHistory(req: Request, res: Response) {
    try {
      const Query = require('../models/query.model').default;
      const queries = await Query.find().sort({ timestamp: -1 }).limit(50);
      res.json(queries);
    } catch (error) {
      console.error('History Error:', error);
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  }
};