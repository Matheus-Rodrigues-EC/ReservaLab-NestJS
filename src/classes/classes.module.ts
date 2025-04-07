/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassesRepository } from './classes.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    PrismaModule, UserModule
  ],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesRepository],
})
export class ClassesModule {}
