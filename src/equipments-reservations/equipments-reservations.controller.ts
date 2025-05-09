/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  HttpCode,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EquipmentsReservationsService } from './equipments-reservations.service';
import { CreateOrUpdateEquipmentsReservationDTO } from './DTOs/create.or.update.equipments-reservations.dto';
import { Guard } from '../auth/guard';

@Controller('equipments-reservations')
export class EquipmentsReservationsController {
  constructor(private readonly equipmentsReservationsService: EquipmentsReservationsService) { }

  @Get('/')
  @HttpCode(200)
  getHealthClassroom() {
    return this.equipmentsReservationsService.getHealthEquipmentReservation();
  }

  @UseGuards(Guard)
  @Post('create')
  @HttpCode(201)
  createReservation(@Body() body: CreateOrUpdateEquipmentsReservationDTO) {
    return this.equipmentsReservationsService.createEquipmentReservation(body);
  }

  @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getReservations() {
    return this.equipmentsReservationsService.getEquipmentReservations();
  }

  @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getReservationByID(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsReservationsService.getEquipmentReservationByID(id);
  }

  @UseGuards(Guard)
  @Get('list/equipment/:id')
  @HttpCode(200)
  getReservationByProfessor(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsReservationsService.getEquipmentReservationByEquipment(id);
  }

  @UseGuards(Guard)
  @Get('list/user/:id')
  @HttpCode(200)
  getReservationByClass(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsReservationsService.getEquipmentReservationByUser(id);
  }

  @UseGuards(Guard)
  @Patch(':id/update')
  @HttpCode(200)
  updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateOrUpdateEquipmentsReservationDTO,
  ) {
    return this.equipmentsReservationsService.updateEquipmentReservation(id, body);
  }

  @UseGuards(Guard)
  @Delete('list/:id')
  @HttpCode(204)
  deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsReservationsService.deleteEquipmentReservation(id);
  }
}
