/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ClassesService } from './classes/classes.service';
import { ClassesController } from './classes/classes.controller';
import { ClassesModule } from './classes/classes.module';
import { ClassroomService } from './classroom/classroom.service';
import { ClassroomController } from './classroom/classroom.controller';
import { ClassroomModule } from './classroom/classroom.module';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UserModule, ClassesModule, ClassroomModule, ReservationsModule],
  controllers: [AppController, ClassesController, ClassroomController, ReservationsController, AuthController],
  providers: [AppService, ClassesService, ClassroomService, ReservationsService],
})
export class AppModule {}