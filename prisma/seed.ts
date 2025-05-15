import { PrismaClient } from '@prisma/client';
import { seedClassrooms } from './seeds/seed-classrooms';
import { seedClasses } from './seeds/seed-classes';
import { seedEquipments } from './seeds/seed-equipments';
import { seedUsers } from './seeds/seed-users';
import { seedReservations } from './seeds/seed-reservations';

const prisma = new PrismaClient();

async function main() {
  await prisma.equipmentsReservation.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.class.deleteMany();
  await prisma.classroom.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ O banco de dados foi limpo!');

  console.log('🔹 Seeding classrooms...');
  await seedClassrooms();

  console.log('🔹 Seeding classes...');
  await seedClasses();

  console.log('🔹 Seeding equipments...');
  await seedEquipments();

  console.log('🔹 Seeding users...');
  await seedUsers();

  console.log('🔹 Seeding reservations...');
  await seedReservations();

  console.log('✅ Seed finalizado!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
