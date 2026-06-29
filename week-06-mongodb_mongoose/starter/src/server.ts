import 'dotenv/config';
import { app } from './app';
import { connectDB } from './lib/mongoose';
import { logger } from './config/logger';

const PORT = Number(process.env['PORT']) || 3000;

async function main(): Promise<void> {
  await connectDB();
  const server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info(`Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
