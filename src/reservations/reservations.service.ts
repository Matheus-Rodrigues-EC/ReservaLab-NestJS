/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrUpdateReservationDTO } from './DTOs/create.or.update.reservations.dto';
import { ReservationsConflictService } from './conflict/reservations-conflict.service.ts';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly conflictService: ReservationsConflictService,
  ) {}
  
  getHealthReservation(): string {
    return 'Reservations is Okay!';
  }

  async createReservation(data: CreateOrUpdateReservationDTO) {
    // console.log('Data: ', data)
    await this.conflictService.validateNoConflicts(data);
    return await this.reservationsRepository.createReservation(data);
  }

  async getReservations() {
    return await this.reservationsRepository.getReservations();
  }

  async getSpecificReservationClassroom(date: Date, time: string[], classroomId: number) {
    const reservationExists = await this.reservationsRepository.getSpecificReservationClassroom(date, time, classroomId);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async getSpecificReservationClass(date: Date, time: string[], classId: number) {
    const reservationExists = await this.reservationsRepository.getSpecificReservationClass(date, time, classId);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);
  }

  async getSpecificReservationUser(date: Date, time: string[], userId: number) {
    const reservationExists =  await this.reservationsRepository.getSpecificReservationUser(date, time, userId);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async getReservationByID(id: number) {
    const reservationExists =  await this.reservationsRepository.getReservationByID(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async getReservationByProfessor(id: number) {
    const reservationExists =  await this.reservationsRepository.getReservationByProfessor(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async getReservationByClassroom(id: number) {
    const reservationExists =  await this.reservationsRepository.getReservationByClassroom(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async getReservationByClass(id: number) {
    const reservationExists =  await this.reservationsRepository.getReservationByClass(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return reservationExists;
  }

  async updateReservation(id: number, data: CreateOrUpdateReservationDTO) {
    const reservationExists =  await this.reservationsRepository.getReservationByID(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return await this.reservationsRepository.updateReservation(id, data);
  }

  async deleteReservation(id: number) {
    const reservationExists =  await this.reservationsRepository.getReservationByID(id);
    if(!reservationExists) 
      throw new HttpException('Reserva não encontrada!', HttpStatus.NOT_FOUND);

    return await this.reservationsRepository.deleteReservation(id);
  }
}