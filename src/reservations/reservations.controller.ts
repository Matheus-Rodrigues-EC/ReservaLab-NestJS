/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  HttpCode,
  Delete,
  // UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateOrUpdateReservationDTO } from './DTOs/create.or.update.reservations.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Get('/')
  @HttpCode(200)
  getHealthClassroom() {
    return this.reservationService.getHealthReservation();
  }

  @Post('create')
  @HttpCode(201)
  createReservation(@Body() body: CreateOrUpdateReservationDTO){
    return this.reservationService.createReservation(body);
  }

  @Get('list')
  @HttpCode(200)
  getReservations(){
    return this.reservationService.getReservations();
  }

  // @Get('list/classroom/:id')
  // @HttpCode(200)
  // getSpecificReservationClassroom(){
  //   return this.reservationService.getSpecificReservationClassroom();
  // }

  // @Get('list/class/:id')
  // @HttpCode(200)
  // getSpecificReservationClass() {
  //   return this.reservationService.getSpecificReservationClass();
  // }

  // @Get('list/user/:id')
  // @HttpCode(200)
  // getSpecificReservationUser() {
  //   return this.reservationService.getSpecificReservationUser();
  // }

  @Get('list/:id')
  @HttpCode(200)
  getReservationByID(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationByID(id);
  }

  @Get('list/professor/:id')
  @HttpCode(200)
  getReservationByProfessor(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationByProfessor(id);
  }

  @Get('list/classroom/:id')
  @HttpCode(200)
  getReservationByClassroom(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationByClassroom(id);
  }

  @Get('list/class/:id')
  @HttpCode(200)
  getReservationByClass(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.getReservationByClass(id);
  }

  @Patch(':id/update')
  @HttpCode(200)
  updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateOrUpdateReservationDTO,
  ) {
    return this.reservationService.updateReservation(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReservation(@Param('id', ParseIntPipe) id: number){
    return this.reservationService.deleteReservation(id);
  }
}
