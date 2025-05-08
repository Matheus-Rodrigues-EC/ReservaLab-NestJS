/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrUpdateEquipmentsDTO } from './DTOs/create.or.update.equipments.dto';
import { EquipmentsRepository } from './equipments.repository';

@Injectable()
export class EquipmentsService {
  constructor(private readonly equipmentsRepository: EquipmentsRepository) {}

  getHealthEquipment(): string {
    return 'Equipment is Okay!'
  }

  async createEquipment(data: CreateOrUpdateEquipmentsDTO) {
    const equipmentExistsName = await this.equipmentsRepository.getEquipmentByName(data.name);
    // const equipmentExistsTombNumber = await this.equipmentsRepository.getEquipmentByTombNumber(data.tombNumber);
    if(equipmentExistsName )
      throw new HttpException('Equipamento já cadastrado', HttpStatus.CONFLICT);

    return await this.equipmentsRepository.createEquipment(data);
  }

  async getEquipments() {
    return await this.equipmentsRepository.getEquipments();
  }

  async getEquipmentByID(id: number) {
    const equipmentExists =  await this.equipmentsRepository.getEquipmentByID(id);
    if(!equipmentExists)
      throw new HttpException('Equipamento não encontrado.', HttpStatus.NOT_FOUND);

    return equipmentExists;
  }

  async getEquipmentByName(name: string) {
    const equipmentExists =  await this.equipmentsRepository.getEquipmentByName(name);
    if(!equipmentExists)
      throw new HttpException('Equipamento não encontrado.', HttpStatus.NOT_FOUND);

    return equipmentExists;
  }

  // async getEquipmentByTombNumber(tombNumber: string) {
  //   const equipmentExists =  await this.equipmentsRepository.getEquipmentByTombNumber(tombNumber);
  //   if(!equipmentExists)
  //     throw new HttpException('Equipamento não encontrado.', HttpStatus.NOT_FOUND);

  //   return equipmentExists;
  // }

  async updateEquipment(id: number, data: CreateOrUpdateEquipmentsDTO) {
    const classExists = await this.equipmentsRepository.updateEquipment(id, data);
    if (!classExists)
      throw new HttpException('Equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return await this.equipmentsRepository.updateEquipment(id, data);
  }

  async deleteEquipment(id: number) {
    const classExists = await this.equipmentsRepository.getEquipmentByID(id);
    if (!classExists)
      throw new HttpException('Equipamento não encontrado!', HttpStatus.NOT_FOUND);

    return await this.equipmentsRepository.deleteEquipment(id);
  }
}
