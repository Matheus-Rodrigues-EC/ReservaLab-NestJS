/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrUpdateEquipmentsReservationDTO } from './DTOs/create.or.update.equipments-reservations.dto';

@Injectable()
export class EquipmentsReservationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEquipmentReservation(
    data: CreateOrUpdateEquipmentsReservationDTO,
  ) {
    return await this.prisma.equipmentsReservation.create({
      data: { ...data },
      select: {
        id: true,
        userId: true,
        date: true,
        time: true,
        equipmentId: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async getEquipmentReservations() {
    return await this.prisma.equipmentsReservation.findMany({
      include: {
        User: true,
        Equipment: true,
      },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    });
  }

  async getSpecificEquipmentReservationEquipment(
    date: Date,
    time: string[],
    equipmentId: number,
  ) {
    return await this.prisma.equipmentsReservation.findUnique({
      where: {
        date_time_equipmentId: {
          date,
          time,
          equipmentId,
        },
      },
    });
  }

  async getEquipmentReservationByDateAndEquipment(
    date: Date,
    equipmentId: number,
  ) {
    return await this.prisma.equipmentsReservation.findMany({
      where: {
        date,
        equipmentId,
      },
      select: {
        time: true,
      },
    });
  }

  async getEquipmentReservationsByDateAndUser(date: Date, userId: number) {
    return await this.prisma.equipmentsReservation.findMany({
      where: {
        date,
        userId,
      },
      select: {
        time: true,
      },
    });
  }

  async getEquipmentReservationsByID(id: number) {
    return await this.prisma.equipmentsReservation.findUnique({
      where: { id: id },
    });
  }

  async getEquipmentReservationsByUser(userId: number) {
    return await this.prisma.equipmentsReservation.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getEquipmentReservationsByEquipment(equipmentId: number) {
    return await this.prisma.equipmentsReservation.findMany({
      where: {
        equipmentId: equipmentId,
      },
    });
  }

  async updateEquipmentReservation(
    id: number,
    data: CreateOrUpdateEquipmentsReservationDTO,
  ) {
    return await this.prisma.equipmentsReservation.update({
      data: {
        userId: data.userId,
        date: data.date,
        time: data.time,
        equipmentId: data.equipmentId,
        description: data.description,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        date: true,
        time: true,
        equipmentId: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: id },
    });
  }

  async deleteEquipmentReservation(id: number) {
    return await this.prisma.equipmentsReservation.delete({
      where: {
        id: id,
      },
    });
  }
}
