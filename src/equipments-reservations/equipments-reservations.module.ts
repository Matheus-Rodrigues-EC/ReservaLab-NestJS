/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { EquipmentsReservationsController } from "./equipments-reservations.controller";
import { EquipmentsReservationsService } from "./equipments-reservations.service";
import { EquipmentsReservationsRepository } from "./equipments-reservations.repository";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../users/user.module";
import { EquipmentReservationConflictService } from "./conflict/equipmentReservation-conflict.service";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [EquipmentsReservationsController],
  providers: [EquipmentsReservationsService, EquipmentsReservationsRepository, EquipmentReservationConflictService],
  exports: [EquipmentsReservationsRepository, EquipmentReservationConflictService]
})
export class EquipmentsReservationsModule {}
