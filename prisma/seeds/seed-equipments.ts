import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateTombNumber(): string {
  const prefix = Math.floor(Math.random() * 900 + 100); // 100–999
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A–Z
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0'); // 0000–9999
  return `${prefix}-${letter}-${suffix}`;
}

export async function seedEquipments() {
  const equipments = [
    { name: 'Projetor', type: 'Vídeo' },
    { name: 'Violão', type: 'Música' },
    { name: 'Caixa de Som', type: 'Audio' },
    { name: 'Cabo HDMI', type: 'Acessório' },
    { name: 'Bola de Basquete', type: 'Esportes' },
    { name: 'Suporte de Tela de projeção', type: 'Infraestrutura' },
  ];

  for (const eq of equipments) {
    await prisma.equipment.upsert({
      where: {
        name_type: {
          name: eq.name,
          type: eq.type,
        },
      },
      update: {},
      create: {
        ...eq,
        tombNumber: generateTombNumber(),
        description: `${eq.name} do tipo ${eq.type}`,
      },
    });
  }

  console.log('✅ Equipamentos criados ou atualizados com sucesso.');
}
