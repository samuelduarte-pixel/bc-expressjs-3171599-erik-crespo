import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import doctorsRouter from './routes/doctors.routes';
import patientsRouter from './routes/patients.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/doctors', doctorsRouter);
app.use('/api/v1/patients', patientsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
