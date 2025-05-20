import { llmService } from './llm.service';
import { n8nService } from './n8n.service';
import { Query } from '../models/query.model';

export const chatService = {
  async getAIResponse(message: string): Promise<string> {
    try {
      // Check if this is an urgent query
      const isUrgent = this.checkUrgency(message);
      
      if (isUrgent) {
        await n8nService.triggerUrgentAlert(message);
      }
      
      // Get response from LLM
      const response = await llmService.generateResponse(message);
      
      return response;
    } catch (error) {
      console.error('Error in chat service:', error);
      return "I'm sorry, I couldn't process your request. Please try again later.";
    }
  },
  
  checkUrgency(message: string): boolean {
    const urgentKeywords = ['urgent', 'emergency', 'help', 'immediately', 'now'];
    return urgentKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
  }
};