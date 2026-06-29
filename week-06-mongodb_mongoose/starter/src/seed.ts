import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Doctor } from './models/doctor.model';
import { Patient } from './models/patient.model';

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones
  await Patient.deleteMany({});
  await Doctor.deleteMany({});

  console.log('Colecciones limpiadas');

  // Insertar doctores
  const doctors = await Doctor.insertMany([
    {
      name: 'Dra. Carolina Mendez',
      specialty: 'Reproduccion Asistida',
      licenseNumber: 'MED-2024-001',
      email: 'carolina.mendez@clinica.com',
      phone: '+57 300 123 4567',
      available: true,
    },
    {
      name: 'Dr. Andres Vargas',
      specialty: 'Ginecologia',
      licenseNumber: 'MED-2024-002',
      email: 'andres.vargas@clinica.com',
      phone: '+57 300 234 5678',
      available: true,
    },
    {
      name: 'Dra. Maria Lopez',
      specialty: 'Endocrinologia',
      licenseNumber: 'MED-2024-003',
      email: 'maria.lopez@clinica.com',
      phone: '+57 300 345 6789',
      available: true,
    },
    {
      name: 'Dr. Carlos Ramirez',
      specialty: 'Urologia',
      licenseNumber: 'MED-2024-004',
      email: 'carlos.ramirez@clinica.com',
      phone: '+57 300 456 7890',
      available: false,
    },
    {
      name: 'Dra. Ana Torres',
      specialty: 'Embriologia',
      licenseNumber: 'MED-2024-005',
      email: 'ana.torres@clinica.com',
      phone: '+57 300 567 8901',
      available: true,
    },
  ]);

  console.log(`${doctors.length} doctores insertados`);

  // Insertar pacientes referenciando doctores
  const patients = await Patient.insertMany([
    {
      firstName: 'Laura',
      lastName: 'Garcia',
      email: 'laura.garcia@email.com',
      phone: '+57 310 111 2233',
      dateOfBirth: new Date('1990-05-15'),
      diagnosis: 'Infertilidad primaria',
      active: true,
      assignedDoctor: doctors[0]._id,
    },
    {
      firstName: 'Sofia',
      lastName: 'Rodriguez',
      email: 'sofia.rodriguez@email.com',
      phone: '+57 311 222 3344',
      dateOfBirth: new Date('1985-08-22'),
      diagnosis: 'Sindrome de ovario poliquistico',
      active: true,
      assignedDoctor: doctors[0]._id,
    },
    {
      firstName: 'Valentina',
      lastName: 'Martinez',
      email: 'valentina.martinez@email.com',
      phone: '+57 312 333 4455',
      dateOfBirth: new Date('1988-12-10'),
      diagnosis: 'Factor masculino',
      active: true,
      assignedDoctor: doctors[1]._id,
    },
    {
      firstName: 'Isabella',
      lastName: 'Lopez',
      email: 'isabella.lopez@email.com',
      phone: '+57 313 444 5566',
      dateOfBirth: new Date('1992-03-28'),
      diagnosis: 'Endometriosis',
      active: false,
      assignedDoctor: doctors[2]._id,
    },
    {
      firstName: 'Camila',
      lastName: 'Hernandez',
      email: 'camila.hernandez@email.com',
      phone: '+57 314 555 6677',
      dateOfBirth: new Date('1987-07-05'),
      diagnosis: 'Infertilidad secundaria',
      active: true,
      assignedDoctor: doctors[0]._id,
    },
  ]);

  console.log(`${patients.length} pacientes insertados`);

  await disconnectDB();
  console.log('Seed completado exitosamente');
}

seed().catch((err) => {
  console.error('Error en el seed:', err);
  process.exit(1);
});
