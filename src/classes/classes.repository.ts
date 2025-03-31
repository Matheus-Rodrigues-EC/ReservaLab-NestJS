import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrUpdateClassesDTO } from './DTOs/create.or.update.classes.dto';

@Injectable()
export class ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClasses(data: CreateOrUpdateClassesDTO) {
    return await this.prisma.class.create({
      data: { ...data },
      select: {
        id: true,
        grade: true,
        className: true,
        shift: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async getClasses() {
    return await this.prisma.class.findMany();
  }

  async getClassByID(id: number) {
    return await this.prisma.class.findUnique({ where: { id: id } });
  }

  async getClassByGrade(grade: number) {
    return await this.prisma.class.findFirst({ where: { grade: grade } });
  }

  async getClassByClassName(classname: string) {
    return await this.prisma.class.findFirst({
      where: { className: classname },
    });
  }

  async getClassByShift(shift: string) {
    return await this.prisma.class.findFirst({
      where: { shift: shift },
    });
  }

  async getClassFull(grade: number, classname: string, shift: string) {
    return await this.prisma.class.findFirst({
      where: {
        grade: grade,
        className: classname,
        shift: shift,
      },
    });
  }

  async updateClass(id: number, data: CreateOrUpdateClassesDTO) {
    return await this.prisma.class.update({
      data: {
        grade: data.grade,
        className: data.className,
        shift: data.shift,
        description: data.description,
      },
      select: {
        id: true,
        grade: true,
        className: true,
        shift: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: id },
    });
  }

  async deleteClass(id: number) {
    return await this.prisma.class.delete({ where: { id: id } });
  }
}
