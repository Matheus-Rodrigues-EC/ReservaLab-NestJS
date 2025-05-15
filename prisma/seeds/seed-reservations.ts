import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const Fundamental_Integral_Times = [
  { id: 1, label: '07:00 às 07:50' },
  { id: 2, label: '07:50 às 08:40' },
  { id: 3, label: '08:40 às 10:00' },
  { id: 4, label: '10:00 às 11:00' },
  { id: 5, label: '13:00 às 13:50' },
  { id: 6, label: '13:50 às 14:40' },
  { id: 7, label: '14:40 às 16:00' },
  { id: 8, label: '16:00 às 16:50' },
];

export async function seedReservations() {
  const users = await prisma.user.findMany();
  const classrooms = await prisma.classroom.findMany();
  const classes = await prisma.class.findMany();
  const equipments = await prisma.equipment.findMany();

  for (const user of users) {
    const reservationsCount = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < reservationsCount; i++) {
      const isRoomReservation = Math.random() > 0.5;

      if (isRoomReservation && classrooms.length && classes.length) {
        await prisma.reservation.create({
          data: {
            userId: user.id,
            classroomId: faker.helpers.arrayElement(classrooms).id,
            classId: faker.helpers.arrayElement(classes).id,
            date: faker.date.soon({ days: 15 }),
            time: [
              `${faker.helpers.arrayElement(Fundamental_Integral_Times).label}`,
            ],
            purpose: String(faker.number.int({ min: 1, max: 9 })),
            description: faker.lorem.sentence(),
          },
        });
      } else if (equipments.length) {
        await prisma.equipmentsReservation.create({
          data: {
            userId: user.id,
            equipmentId: faker.helpers.arrayElement(equipments).id,
            date: faker.date.future(),
            time: ['10:00', '11:00'],
            description: faker.lorem.sentence(),
          },
        });
      }
    }
  }

  console.log('✅ Reservas criadas ou atualizadas com sucesso.');
}
