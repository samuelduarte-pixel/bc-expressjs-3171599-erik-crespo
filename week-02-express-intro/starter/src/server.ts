import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

// Arrancar el servidor y guardar la referencia
const server = app.listen(Number(PORT), () => {
  console.log(`🏥 Clínica de Fertilidad API`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET  /health`);
  console.log(`   ---`);
  console.log(`   GET/POST        /api/v1/patients`);
  console.log(`   GET/PUT/DELETE  /api/v1/patients/:id`);
  console.log(`   GET/POST        /api/v1/treatments`);
  console.log(`   GET/PUT/DELETE  /api/v1/treatments/:id`);
  console.log(`   GET/POST        /api/v1/doctors`);
  console.log(`   GET/PUT/DELETE  /api/v1/doctors/:id`);
  console.log(`   GET/POST        /api/v1/cycles`);
  console.log(`   GET/PUT/DELETE  /api/v1/cycles/:id`);
});

// Graceful shutdown — cerrar el servidor limpiamente
function shutdown(signal: string): void {
  console.log(`\n⚠️  ${signal} recibido. Cerrando servidor...`);
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));