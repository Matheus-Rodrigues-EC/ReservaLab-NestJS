/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ClassesService } from './classes/classes.service';
import { ClassesController } from './classes/classes.controller';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [UserModule, ClassesModule],
  controllers: [AppController, ClassesController],
  providers: [AppService, ClassesService],
})
export class AppModule {}