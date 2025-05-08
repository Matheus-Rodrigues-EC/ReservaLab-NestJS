/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrUpdateEquipmentsReservationDTO } from './DTOs/create.or.update.equipments-reservations.dto';
import { EquipmentReservationConflictService } from './conflict/equipmentReservation-conflict.service';
import { EquipmentsReservationsRepository } from './equipments-reservations.repository';

@Injectable()
export class EquipmentsReservationsService {
  constructor(
    private readonly equipmentsRepository: EquipmentsReservationsRepository,
    private readonly conflictService: EquipmentReservationConflictService,
  ) {}

  getHealthEquipmentReservation(): string {
    return 'Equipment reservations is Okay!';
  }

  async createEquipmentReservation(data: CreateOrUpdateEquipmentsReservationDTO){
    await this.conflictService.ValidateNoConflicts(data);
    return await this.equipmentsRepository.createEquipmentReservation(data);
  }

  async getEquipmentReservations() {
    return await this.equipmentsRepository.getEquipmentReservations();
  }

  async getEquipmentReservationByDateAndEquipment(date: Date, time: string[], equipmentId: number){
    const equipmentReservationExists = await this.equipmentsRepository.getSpecificEquipmentReservationEquipment(date, time, equipmentId);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND)

    return equipmentReservationExists;
  }

  async getEquipmentReservationByID(id: number) {
    const equipmentReservationExists = await this.equipmentsRepository.getEquipmentReservationsByID(id);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return equipmentReservationExists;
  }

  async getEquipmentReservationByUser(userId: number) {
    const equipmentReservationExists = await this.equipmentsRepository.getEquipmentReservationsByUser(userId);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return equipmentReservationExists;
  }

  async getEquipmentReservationByEquipment(equipmentId: number) {
    const equipmentReservationExists = await this.equipmentsRepository.getEquipmentReservationsByEquipment(equipmentId);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return equipmentReservationExists;
  }

  async updateEquipmentReservation(id: number, data: CreateOrUpdateEquipmentsReservationDTO) {
    const equipmentReservationExists = await this.equipmentsRepository.updateEquipmentReservation(id, data);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return equipmentReservationExists;
  }

  async deleteEquipmentReservation(id: number) {
    const equipmentReservationExists = await this.equipmentsRepository.getEquipmentReservationsByID(id);
    if(!equipmentReservationExists)
      throw new HttpException('Reserva de equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return await this.equipmentsRepository.deleteEquipmentReservation(id);
  }
}
