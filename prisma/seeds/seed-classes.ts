import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedClasses() {
  const classes = [
    { grade: 1, className: 'A', shift: 'Manhã' },
    { grade: 1, className: 'B', shift: 'Tarde' },
    { grade: 2, className: 'A', shift: 'Manhã' },
    { grade: 3, className: 'C', shift: 'Tarde' },
    { grade: 8, className: 'B', shift: 'Noite' },
    { grade: 9, className: 'A', shift: 'Integral' },
  ];

  for (const cls of classes) {
    await prisma.class.upsert({
      where: {
        grade_className_shift: {
          grade: cls.grade,
          className: cls.className,
          shift: cls.shift,
        },
      },
      update: {},
      create: {
        ...cls,
        description: `Turma ${cls.grade}${cls.className} - ${cls.shift}`,
      },
    });
  }

  console.log('✅ Classes criadas ou atualizadas com sucesso.');
}
