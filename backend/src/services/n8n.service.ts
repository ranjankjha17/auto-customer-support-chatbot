import axios from 'axios';
import config from '../config';
import { IQuery } from '../models/query.model';

export default {
  async triggerAlert(query: IQuery): Promise<void> {
    try {
      await axios.post(config.n8n.webhookUrl, {
        query: query.content,
        timestamp: query.timestamp,
        urgency: query.urgency
      });
    } catch (error) {
      console.error('n8n Error:', error);
      throw new Error('Failed to trigger n8n alert');
    }
  },

  async storeQuery(query: IQuery): Promise<void> {
    try {
      await axios.post(`${config.n8n.webhookUrl}/store`, {
        ...query.toObject()
      });
    } catch (error) {
      console.error('n8n Storage Error:', error);
      throw new Error('Failed to store query in n8n');
    }
  }
};