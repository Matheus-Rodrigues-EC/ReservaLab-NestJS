/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReservationsController } from "./reservations.controller";
import { ReservationsService } from "./reservations.service";
import { ReservationsRepository } from "./reservations.repository";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../users/user.module";
import { ReservationsConflictService } from './conflict/reservations-conflict.service.ts';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository, ReservationsConflictService],
  exports: [ReservationsRepository, ReservationsConflictService]
})
export class ReservationsModule {};