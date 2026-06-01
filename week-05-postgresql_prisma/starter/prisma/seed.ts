import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes (idempotencia)
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  // Crear doctores
  const dra = await prisma.doctor.create({
    data: {
      name: 'Dra. Valentina Ríos',
      specialty: 'Reproducción Asistida',
      licenseNo: 'MED-001',
      email: 'v.rios@clinica.com',
      phone: '3001234567',
    },
  });

  const dr = await prisma.doctor.create({
    data: {
      name: 'Dr. Andrés Mora',
      specialty: 'Endocrinología Reproductiva',
      licenseNo: 'MED-002',
      email: 'a.mora@clinica.com',
      phone: '3007654321',
    },
  });

  // Crear pacientes
  const result = await prisma.patient.createMany({
    data: [
      {
        firstName: 'Laura',
        lastName: 'Gómez',
        email: 'laura.gomez@email.com',
        phone: '3101112233',
        dateOfBirth: new Date('1990-05-14'),
        diagnosis: 'Síndrome de ovario poliquístico',
        doctorId: dra.id,
      },
      {
        firstName: 'Camila',
        lastName: 'Herrera',
        email: 'camila.herrera@email.com',
        phone: '3112223344',
        dateOfBirth: new Date('1988-11-20'),
        diagnosis: 'Endometriosis leve',
        doctorId: dra.id,
      },
      {
        firstName: 'Sofía',
        lastName: 'Vargas',
        email: 'sofia.vargas@email.com',
        phone: '3123334455',
        dateOfBirth: new Date('1993-03-08'),
        diagnosis: 'Factor masculino severo',
        doctorId: dr.id,
      },
      {
        firstName: 'Daniela',
        lastName: 'Castro',
        email: 'daniela.castro@email.com',
        phone: '3134445566',
        dateOfBirth: new Date('1985-07-25'),
        diagnosis: 'Fallo ovárico prematuro',
        doctorId: dr.id,
      },
      {
        firstName: 'Mariana',
        lastName: 'López',
        email: 'mariana.lopez@email.com',
        phone: '3145556677',
        dateOfBirth: new Date('1995-01-30'),
        diagnosis: 'Infertilidad inexplicada',
        doctorId: dra.id,
      },
    ],
  });

  console.log(`✅ 2 doctores creados`);
  console.log(`✅ ${result.count} pacientes creados`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });