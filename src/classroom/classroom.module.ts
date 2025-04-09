/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ClassroomController } from "./classroom.controller";
import { ClassroomService } from "./classroom.service";
import { ClassroomRepository } from "./classroom.repository";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../users/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ClassroomController],
  providers: [ClassroomService, ClassroomRepository],
  exports: [ClassroomRepository]
})
export class ClassroomModule {};