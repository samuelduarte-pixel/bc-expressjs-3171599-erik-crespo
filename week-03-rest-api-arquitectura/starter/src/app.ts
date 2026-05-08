// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { patientsRouter }   from './routes/patients.routes.js';
import { doctorsRouter }    from './routes/doctors.routes.js';
import { treatmentsRouter } from './routes/treatments.routes.js';
import { cyclesRouter }     from './routes/cycles.routes.js';
import { ErrorResponse }    from './types.js';

const app: express.Express = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '03', project: 'clinica-fertilidad' });
});

app.use('/api/v1/patients',   patientsRouter);
app.use('/api/v1/doctors',    doctorsRouter);
app.use('/api/v1/treatments', treatmentsRouter);
app.use('/api/v1/cycles',     cyclesRouter);

// Error handler global
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  const response: ErrorResponse = { error: 'Internal Server Error', message: err.message };
  res.status(500).json(response);
});

export default app;