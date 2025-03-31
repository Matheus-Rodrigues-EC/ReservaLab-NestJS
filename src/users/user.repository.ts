import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/create.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserByID(id: number) {
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
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
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

  async updatePasswordById(id: number, data: UpdatePasswordUserDTO) {
    return await this.prisma.user.update({
      data: {
        password: data.password,
      },
      select: {
        id: true,
        name: true,
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

  async deleteUserByID(id: number) {
    return await this.prisma.$transaction([
      this.prisma.reservation.deleteMany({ where: { userId: id } }),
      this.prisma.user.deleteMany({ where: { id: id } }),
    ]);
  }
}
