/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrUpdateEquipmentsReservationDTO } from '../DTOs/create.or.update.equipments-reservations.dto';
import { EquipmentsReservationsRepository } from '../equipments-reservations.repository';

@Injectable()
export class EquipmentReservationConflictService {
  constructor(
    private readonly equipmentReservationsRepository: EquipmentsReservationsRepository,
  ) {}

  // Equipamentos
  async ValidateNoConflicts(data: CreateOrUpdateEquipmentsReservationDTO) {
    const reservationEquipment = await this.equipmentReservationsRepository.getEquipmentReservationByDateAndEquipment(data.date, data.equipmentId);

    const validateEquipment = data?.time.filter((time) => 
      reservationEquipment.some((equipment) => 
      equipment.time.includes(time))
    );
    
    if (reservationEquipment.some(timeItem => data.time.every(t => timeItem.time.includes(t))) || validateEquipment.length > 0) {
      throw new HttpException('Este Equipamento já foi reservado para esse horário.', HttpStatus.CONFLICT);
    }

     // Usuário (professor)
    // const reservationsUser = await this.equipmentReservationsRepository.getEquipmentReservationsByDateAndUser(data.date, data.userId);

    // const validateUser = data?.time.filter((time) =>
    //   reservationsUser.some((reservation) => 
    //     reservation.time.includes(time)
    //   )
    // );

    // if (reservationsUser.some(timeItem => data.time.every(t => timeItem.time.includes(t))) || validateUser.length > 0) {
    //   throw new HttpException('O Professor já possui reserva nesse horário.', HttpStatus.CONFLICT);
    // }
  }
}
