/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrUpdateEquipmentsDTO } from './DTOs/create.or.update.equipments.dto';

@Injectable()
export class EquipmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEquipment(data: CreateOrUpdateEquipmentsDTO) {
    return await this.prisma.equipment.create({
      data: { ...data },
      select: {
        id: true,
        name: true,
        type: true,
        tombNumber: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async getEquipments() {
    return await this.prisma.equipment.findMany({
      orderBy: [{ name: 'asc' }],
    });
  }

  async getEquipmentByID(id: number) {
    return await this.prisma.equipment.findUnique({ where: { id: id } });
  }

  async getEquipmentByName(name: string) {
    return await this.prisma.equipment.findFirst({ where: { name: name } });
  }

  async getEquipmentByTombNumber(tombNumber: string) {
    return await this.prisma.equipment.findUnique({
      where: { tombNumber: tombNumber },
    });
  }

  async updateEquipment(id: number, data: CreateOrUpdateEquipmentsDTO) {
    return await this.prisma.equipment.update({
      data: {
        name: data.name,
        type: data.type,
        tombNumber: data.tombNumber,
        description: data.description,
      },
      select: {
        id: true,
        name: true,
        type: true,
        tombNumber: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: id },
    });
  }

  async deleteEquipment(id: number) {
    return await this.prisma.equipment.delete({ where: { id: id } });
  }
}
