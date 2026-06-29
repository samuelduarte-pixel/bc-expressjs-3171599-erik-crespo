import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import patientsRouter from './routes/patients.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/patients', patientsRouter);

app.use(notFound);
app.use(errorHandler);
