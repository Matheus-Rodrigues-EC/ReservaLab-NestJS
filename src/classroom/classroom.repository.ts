/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrUpdateClassroomDTO } from './DTOs/create.or.update.classroom.dto';

@Injectable()
export class ClassroomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClassroom(data: CreateOrUpdateClassroomDTO) {
    return this.prisma.classroom.create({
      data: { ...data },
      select: {
        id: true,
        name: true,
        capacity: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async getClassrooms() {
    return await this.prisma.classroom.findMany({
      orderBy:{
        name: 'asc',
      }
    });
  }

  async getClassroomByID(id: number) {
    return await this.prisma.classroom.findUnique({ where: { id: id } });
  }
  
  async getClassroomByName(name: string) {
    return await this.prisma.classroom.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async updateClassroom(id: number, data: CreateOrUpdateClassroomDTO) {
    return await this.prisma.classroom.update({
      data: {
        name: data.name,
        capacity: data.capacity,
        description: data.description,
        updatedAt: new Date(),
      },
      select: {
        name: true,
        capacity: true,
        description: true,
        updatedAt: true,
      },
      where: { id: id },
    });
  }

  async deleteClassroom(id: number) {
    return await this.prisma.classroom.delete({ where: { id: id } });
  }
}
