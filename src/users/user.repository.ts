/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './DTOs/create.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(data: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        rulets: true,
        shift: true,
        subject: true,
      }
    });
  }

  async getUserByID(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async getUserByIDToUpdate(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async getUserBySurname(surname: string) {
    return await this.prisma.user.findFirst({ where: { surname: surname } });
  }

  async updateUserByID(id: number, data: UpdateUserDTO) {
    return await this.prisma.user.update({
      data: {
        name: data.name,
        surname: data?.surname,
        subject: data?.subject,
        rulets: data?.rulets,
        shift: data?.shift,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        subject: true,
        rulets: true,
        shift: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });
  }

  async updatePasswordById(id: number, data: UpdatePasswordUserDTO) {
    return await this.prisma.user.update({
      data: {
        password: bcrypt.hashSync(data.password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        subject: true,
        rulets: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });
  }

  async recoverPasswordByEmail(email: string, password: string) {
    return await this.prisma.user.update({
      data: {
        password: bcrypt.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
        surname: true,
        subject: true,
        rulets: true,
        updatedAt: true,
      },
      where: {
        email: email,
      },
    })
  }

  async deleteUserByID(id: number) {
    return await this.prisma.$transaction([
      this.prisma.reservation.deleteMany({ where: { userId: id } }),
      this.prisma.user.deleteMany({ where: { id: id } }),
    ]);
  }
}
