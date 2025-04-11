/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationsRepository } from '../reservations.repository';
import { CreateOrUpdateReservationDTO } from '../DTOs/create.or.update.reservations.dto';

@Injectable()
export class ReservationsConflictService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {}
  
  async validateNoConflicts(data: CreateOrUpdateReservationDTO) {

    // Sala
    const reservationsClassroom = await this.reservationsRepository.getReservationsByDateAndClassroom(data.date, data.classroomId);

    const validateClassroom = data?.time.filter((time) =>
      reservationsClassroom.some((reservation) => 
        reservation.time.includes(time)
      )
    );
    console.log('validateClassroom: ', validateClassroom);
    console.log(reservationsClassroom);


    if (reservationsClassroom.some(timeItem => data.time.every(t => timeItem.time.includes(t))) || validateClassroom.length > 0) {
      console.log('Classroom: ', reservationsClassroom);
      throw new HttpException('A sala já foi reservada para esse horário.', HttpStatus.CONFLICT);
    }

    // Turma
    const reservationsClass = await this.reservationsRepository.getReservationsByDateAndClass(data.date, data.classId);

    const validateClass = data?.time.filter((time) =>
      reservationsClass.some((reservation) => 
        reservation.time.includes(time)
      )
    );
    console.log('validateClass: ', validateClass);
    console.log('Class: ', reservationsClass);

    if (reservationsClass.some(timeItem => data.time.every(t => timeItem.time.includes(t))) || validateClass.length > 0) {
      throw new HttpException('A Turma já possui reserva nesse horário.', HttpStatus.CONFLICT);
    }

    // Usuário (professor)
    const reservationsUser = await this.reservationsRepository.getReservationsByDateAndUser(data.date, data.userId);

    const validateUser = data?.time.filter((time) =>
      reservationsUser.some((reservation) => 
        reservation.time.includes(time)
      )
    );
    console.log('validateUser: ', validateUser);
    console.log('User: ', reservationsUser);

    if (reservationsUser.some(timeItem => data.time.every(t => timeItem.time.includes(t))) || validateUser.length > 0) {
      throw new HttpException('O Professor já possui reserva nesse horário.', HttpStatus.CONFLICT);
    }
  }
}
