import createApp from './app';
import config from './config';

async function startServer() {
  const app = await createApp();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});