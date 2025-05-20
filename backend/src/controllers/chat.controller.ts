import { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import { Query } from '../models/query.model';

export const chatController = {
  async handleChatMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      
      // Store the query
      const query = new Query({
        content: message,
        timestamp: new Date(),
      });
      await query.save();
      
      // Get AI response
      const response = await chatService.getAIResponse(message);
      
      // Stream the response
      res.setHeader('Content-Type', 'text/plain');
      
      // Simulate streaming for demo
      const words = response.split(' ');
      for (const word of words) {
        res.write(word + ' ');
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};