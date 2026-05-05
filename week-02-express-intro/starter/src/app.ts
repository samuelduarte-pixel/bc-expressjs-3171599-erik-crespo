import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { patientsRouter } from './routes/patients.routes.js';
import { treatmentsRouter } from './routes/treatments.routes.js';
import { doctorsRouter } from './routes/doctors.routes.js';
import { cyclesRouter } from './routes/cycles.routes.js';

export function createApp(): Application {
  const app = express();

  // 1. Parseo de body JSON
  app.use(express.json());

  // 2. Logger personalizado — método, URL, status, tiempo
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Se ejecuta cuando la respuesta termina
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`
      );
    });

    next();
  });

  // 3. Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'Clínica de Fertilidad API' });
  });

  // 4. Rutas de los recursos
  app.use('/api/v1/patients', patientsRouter);
  app.use('/api/v1/treatments', treatmentsRouter);
  app.use('/api/v1/doctors', doctorsRouter);
  app.use('/api/v1/cycles', cyclesRouter);

  // 5. Handler 404 — ruta no encontrada
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // 6. Error handler global — SIEMPRE el último (4 parámetros obligatorios)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  });

  return app;
}