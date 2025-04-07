/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrUpdateReservationDTO } from './DTOs/create.or.update.reservations.dto';

@Injectable()
export class ReservationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(data: CreateOrUpdateReservationDTO) {
    return await this.prisma.reservation.create({
      data: { ...data },
      select: {
        id: true,
        userId: true,
        date: true,
        classroomId: true,
        time: true,
        purpose: true,
        classId: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getReservations() {
    return await this.prisma.reservation.findMany({
      include: {
        User: true,
        Classroom: true,
        Class: true,
      },
    });
  }

  async getSpecificReservationClassroom(
    date: string,
    time: string,
    classroomId: number,
  ) {
    return await this.prisma.reservation.findUnique({
      where: {
        date_time_classroomId: {
          date,
          time,
          classroomId,
        },
      },
    });
  }

  async getSpecificReservationClass(date: string, time: string, classId: number) {
    return await this.prisma.reservation.findUnique({
      where: {
        date_time_classId: {
          date,
          time,
          classId,
        },
      },
    });
  }

  async getSpecificReservationUser(date: string, time: string, userId: number) {
    return await this.prisma.reservation.findUnique({
      where: {
        date_time_userId: {
          date,
          time,
          userId,
        },
      },
    });
  }

  async getReservationByID(id: number) {
    return await this.prisma.reservation.findUnique({ where: { id: id } });
  }

  async getReservationByProfessor(id: number) {
    return await this.prisma.reservation.findMany({ where: { userId: id } });
  }

  async getReservationByClassroom(id: number) {
    return await this.prisma.reservation.findMany({
      where: { classroomId: id },
    });
  }

  async getReservationByClass(id: number) {
    return await this.prisma.reservation.findMany({ where: { classId: id } });
  }

  async updateReservation(id: number, data: CreateOrUpdateReservationDTO) {
    return await this.prisma.reservation.update({
      data: {
        userId: data.userId,
        date: data.date,
        classroomId: data.classroomId,
        time: data.time,
        purpose: data.purpose,
        classId: data.classId,
        description: data.description,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        date: true,
        classroomId: true,
        time: true,
        purpose: true,
        classId: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: id },
    });
  }

  async deleteReservation(id: number) {
    return await this.prisma.reservation.delete({ where: { id: id } });
  }
}
