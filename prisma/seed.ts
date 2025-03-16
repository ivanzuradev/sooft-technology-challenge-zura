import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Estas lineas se pueden comentar si no se quiere limpiar la base al construirla otra vez.
  try {
    await prisma.empresa.deleteMany();
  } catch (error) {
    console.log(error);
  }
  try {
    await prisma.transferencia.deleteMany();
  } catch (error) {
    console.log(error);
  }
  try {
    await prisma.user.deleteMany();
  } catch (error) {
    console.log(error);
  }

  console.log('Cargando datos de prueba... 🚀');

  const hashedPassword1 = await bcrypt.hash('admin123', 10);
  const hashedPassword2 = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sooft.tech' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@sooft.tech',
      password: hashedPassword1,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@sooft.tech' },
    update: {},
    create: {
      username: 'user',
      email: 'user@sooft.tech',
      password: hashedPassword2,
      role: 'USER',
    },
  });

  console.log('Usuarios creados: 🕺', { admin: admin.email, user: user.email });

  const empresas = [
    {
      cuit: '30-71237574-8',
      razonSocial: 'Santander',
      fechaAdhesion: new Date('2025-02-10'),
    },
    {
      cuit: '30-71234664-9',
      razonSocial: 'Gire S.A',
      fechaAdhesion: new Date('2025-03-05'),
    },
    {
      cuit: '30-71234569-0',
      razonSocial: 'Mercado Libre SRL',
      fechaAdhesion: new Date('2025-01-15'),
    },
    {
      cuit: '30-71765744-1',
      razonSocial: 'Ferretería Coppola',
      fechaAdhesion: new Date('2024-12-20'),
    },
    {
      cuit: '30-71234571-2',
      razonSocial: 'Pinturerías Caporasso',
      fechaAdhesion: new Date('2024-11-05'),
    },
  ];

  console.log('Creando empresas... 🏢');
  for (const empresa of empresas) {
    await prisma.empresa.upsert({
      where: { cuit: empresa.cuit },
      update: empresa,
      create: empresa,
    });
  }

  const empresasDB = await prisma.empresa.findMany();
  console.log('Creando transferencias... 🤑');

  const transferenciasActuales = [
    {
      importe: 15000.5,
      empresaId: empresasDB[0].id,
      cuentaDebito: '00012345678',
      cuentaCredito: '00087654321',
      fechaTransferencia: new Date('2025-03-10'),
    },
    {
      importe: 8750.25,
      empresaId: empresasDB[1].id,
      cuentaDebito: '00023456789',
      cuentaCredito: '00098765432',
      fechaTransferencia: new Date('2025-03-05'),
    },
  ];

  const transferenciasUltimoMes = [
    {
      importe: 12300.75,
      empresaId: empresasDB[0].id,
      cuentaDebito: '00012345678',
      cuentaCredito: '00087654321',
      fechaTransferencia: new Date('2025-02-20'),
    },
    {
      importe: 5400.30,
      empresaId: empresasDB[2].id,
      cuentaDebito: '00034567890',
      cuentaCredito: '00009876543',
      fechaTransferencia: new Date('2025-02-15'),
    },
    {
      importe: 7800.60,
      empresaId: empresasDB[3].id,
      cuentaDebito: '00045678901',
      cuentaCredito: '00001234567',
      fechaTransferencia: new Date('2025-02-10'),
    },
  ];

  const transferenciasAnteriores = [
    {
      importe: 9200.4,
      empresaId: empresasDB[4].id,
      cuentaDebito: '00056789012',
      cuentaCredito: '00007654321',
      fechaTransferencia: new Date('2025-01-25'),
    },
    {
      importe: 3600.2,
      empresaId: empresasDB[3].id,
      cuentaDebito: '00045678901',
      cuentaCredito: '00001234567',
      fechaTransferencia: new Date('2025-01-20'),
    },
  ];

  const todasLasTransferencias = [
    ...transferenciasActuales,
    ...transferenciasUltimoMes,
    ...transferenciasAnteriores,
  ];

  for (const transferencia of todasLasTransferencias) {
    await prisma.transferencia.create({
      data: transferencia,
    });
  }

  console.log('Datos mock cargados exitosamente 😎');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });