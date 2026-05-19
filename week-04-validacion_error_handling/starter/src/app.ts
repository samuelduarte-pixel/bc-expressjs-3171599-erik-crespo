import express from 'express';
import { morganMiddleware } from './config/logger';
import patientsRouter from './routes/items.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Clínica de Fertilidad API' });
});

app.use('/api/v1/patients', patientsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;