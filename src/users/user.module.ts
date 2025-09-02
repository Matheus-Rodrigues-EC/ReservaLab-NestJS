/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PrismaModule,
    MailerModule.forRoot({
      transport: `smtp://${process.env.GOOGLE_USER}:${process.env.GOOGLE_APP_PASSWORD}@smtp.gmail.com`,
      // transport: "smtp://reservalab.25@gmail.com:password@smtp.domain.com",
      defaults: {
        secure: false, //para usar 587 ou true para 465
        from: '"ReservaLab Suporte" <reservalab.25@gmail.com>'
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule { }
