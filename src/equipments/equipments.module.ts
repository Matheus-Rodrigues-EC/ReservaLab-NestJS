/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';
import { EquipmentsRepository } from './equipments.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    PrismaModule, UserModule
  ],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, EquipmentsRepository],
  exports: [EquipmentsRepository],
})
export class EquipmentsModule {}
