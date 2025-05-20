import axios from 'axios';
import { config } from '../config';

export const n8nService = {
  async triggerUrgentAlert(message: string): Promise<void> {
    try {
      await axios.post(config.n8n.webhookUrl, {
        message,
        timestamp: new Date().toISOString(),
        priority: 'high'
      });
    } catch (error) {
      console.error('Failed to trigger n8n alert:', error);
    }
  },
  
  async storeQuery(query: string): Promise<void> {
    try {
      await axios.post(`${config.n8n.baseUrl}/query-storage`, {
        query,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to store query in n8n:', error);
    }
  }
};