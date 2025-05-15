import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedClassrooms() {
  const classrooms = [
    {
      name: 'Sala 101',
      capacity: 30,
      description: 'Sala para aulas teóricas',
    },
    {
      name: 'Laboratório 1',
      capacity: 20,
      description: 'Laboratório de informática',
    },
    {
      name: 'Sala de Artes',
      capacity: 15,
      description: 'Espaço para atividades artísticas',
    },
    {
      name: 'Quadra',
      capacity: 50,
      description: 'Espaço para atividades físicas/esportivas',
    },
    {
      name: 'Biblioteca',
      capacity: 15,
      description: 'Espaço para leitura e/ou atividades escolares',
    },
  ];

  for (const room of classrooms) {
    await prisma.classroom.upsert({
      where: { name: room.name },
      update: {},
      create: room,
    });
  }

  console.log('✅ Classrooms criadas ou atualizadas com sucesso.');
}
