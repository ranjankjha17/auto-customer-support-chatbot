import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chatRoutes from './routes/chat.routes';
import config from './config';
import mongoose from 'mongoose';

export default async function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));

  // Database connection
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  // Routes
  app.use('/api/chat', chatRoutes);

  // Health check
  app.get('/health', (req, res) => res.status(200).send('OK'));

  // Error handling
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}