import { IQuery } from '../models/query.model';
import llmService from './llm.service';
import n8nService from './n8n.service';

export default {
  async processQuery(userQuery: string): Promise<{ response: string; query: IQuery }> {
    // Create query record
    const query = new (require('../models/query.model').default)({
      content: userQuery,
      urgency: this.determineUrgency(userQuery)
    });

    // Get AI response
    const response = await llmService.generateResponse(userQuery);
    query.response = response;

    // Save to database
    await query.save();

    // Trigger automations
    if (query.urgency === 'high') {
      await n8nService.triggerAlert(query);
    }
    await n8nService.storeQuery(query);

    return { response, query };
  },

  determineUrgency(content: string): 'low' | 'medium' | 'high' {
    const urgentKeywords = ['urgent', 'emergency', 'help now', 'immediately'];
    const mediumKeywords = ['question', 'help', 'support'];
    
    const lowerContent = content.toLowerCase();
    
    if (urgentKeywords.some(kw => lowerContent.includes(kw))) return 'high';
    if (mediumKeywords.some(kw => lowerContent.includes(kw))) return 'medium';
    return 'low';
  }
};