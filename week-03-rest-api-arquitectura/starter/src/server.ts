// ============================================
// SERVER — Entry point
// ============================================
import app from './app.js';

const PORT = parseInt(process.env['PORT'] ?? '3000', 10);

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
  console.log(`[server] Health:      http://localhost:${PORT}/health`);
  console.log(`[server] Patients:    http://localhost:${PORT}/api/v1/patients`);
  console.log(`[server] Doctors:     http://localhost:${PORT}/api/v1/doctors`);
  console.log(`[server] Treatments:  http://localhost:${PORT}/api/v1/treatments`);
  console.log(`[server] Cycles:      http://localhost:${PORT}/api/v1/cycles`);
});