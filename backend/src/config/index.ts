import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/support-chatbot',
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo'
  },
  n8n: {
    webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook'
  },
  isProduction: process.env.NODE_ENV === 'production'
};