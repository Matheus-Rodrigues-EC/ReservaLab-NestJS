import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const roles = [
    { role: 'Diretor(a)', count: 1 },
    { role: 'Coordenador(a)', count: 2 },
    { role: 'Professor(a)', count: 5 },
    { role: 'Apoio', count: 3 },
  ];

  for (const { role, count } of roles) {
    for (let i = 0; i < count; i++) {
      await prisma.user.create({
        data: {
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email().toLowerCase(),
          password: bcrypt.hashSync('@1234Abcd', 10),
          subject: faker.helpers.arrayElement([
            'Matemática',
            'Português',
            'História',
            'Geografia',
            'Artes',
            'Religião',
            'Ciências',
            'Educação Física',
          ]),
          rulets: role,
          shift: faker.helpers.arrayElement([
            'Manhã',
            'Tarde',
            'Noite',
            'Integral',
          ]),
        },
      });
    }
  }

  console.log('✅ Usuários criados ou atualizados com sucesso.');
}
