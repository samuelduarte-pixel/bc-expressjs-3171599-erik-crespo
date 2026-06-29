import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { UserModel } from './models/user.model';
import { Patient } from './models/patient.model';
import bcrypt from 'bcrypt';

async function seed(): Promise<void> {
  await connectDB();

  await Patient.deleteMany({});
  await UserModel.deleteMany({});

  console.log('Colecciones limpiadas');

  const hashedPassword = await bcrypt.hash('Password1', 10);

  const users = await UserModel.insertMany([
    {
      email: 'admin@clinica.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
    },
    {
      email: 'doctor@clinica.com',
      password: hashedPassword,
      name: 'Dr. Erik Crespo',
      role: 'user',
    },
  ]);

  console.log(`${users.length} usuarios insertados`);

  const patients = await Patient.insertMany([
    {
      firstName: 'Laura',
      lastName: 'Garcia',
      email: 'laura.garcia@email.com',
      phone: '+57 310 111 2233',
      dateOfBirth: new Date('1990-05-15'),
      diagnosis: 'Infertilidad primaria',
      active: true,
      assignedDoctor: users[1]._id,
      addedBy: users[0]._id,
    },
    {
      firstName: 'Sofia',
      lastName: 'Rodriguez',
      email: 'sofia.rodriguez@email.com',
      phone: '+57 311 222 3344',
      dateOfBirth: new Date('1985-08-22'),
      diagnosis: 'Sindrome de ovario poliquistico',
      active: true,
      assignedDoctor: users[1]._id,
      addedBy: users[0]._id,
    },
    {
      firstName: 'Valentina',
      lastName: 'Martinez',
      email: 'valentina.martinez@email.com',
      phone: '+57 312 333 4455',
      dateOfBirth: new Date('1988-12-10'),
      diagnosis: 'Factor masculino',
      active: true,
      assignedDoctor: users[1]._id,
      addedBy: users[0]._id,
    },
    {
      firstName: 'Isabella',
      lastName: 'Lopez',
      email: 'isabella.lopez@email.com',
      phone: '+57 313 444 5566',
      dateOfBirth: new Date('1992-03-28'),
      diagnosis: 'Endometriosis',
      active: false,
      assignedDoctor: users[1]._id,
      addedBy: users[0]._id,
    },
    {
      firstName: 'Camila',
      lastName: 'Hernandez',
      email: 'camila.hernandez@email.com',
      phone: '+57 314 555 6677',
      dateOfBirth: new Date('1987-07-05'),
      diagnosis: 'Infertilidad secundaria',
      active: true,
      assignedDoctor: users[1]._id,
      addedBy: users[0]._id,
    },
  ]);

  console.log(`${patients.length} pacientes insertados`);

  await disconnectDB();
  console.log('Seed completado exitosamente');
  console.log('');
  console.log('Usuarios de prueba:');
  console.log('  admin@clinica.com / Password1 (admin)');
  console.log('  doctor@clinica.com / Password1 (user)');
}

seed().catch((err) => {
  console.error('Error en el seed:', err);
  process.exit(1);
});
