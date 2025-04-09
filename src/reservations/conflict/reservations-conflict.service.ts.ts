/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationsRepository } from '../reservations.repository';

@Injectable()
export class ReservationsConflictService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {}

  private parseTimeInterval(time: string) {
    const [start, end] = time.split(' - ');
    return { start, end };
  }

  private hasTimeConflict(newStart: string, newEnd: string, existingTime: string): boolean {
    const [existingStart, existingEnd] = existingTime.split(' - ');
    return newStart < existingEnd && newEnd > existingStart;
  }

  async validateNoConflicts(data: {
    date: string;
    time: string;
    classroomId: number;
    classId: number;
    userId: number;
  }) {
    const { start: newStart, end: newEnd } = this.parseTimeInterval(data.time);

    // Sala
    const reservationsClassroom = await this.reservationsRepository.getReservationsByDateAndClassroom(data.date, data.classroomId);
    if (reservationsClassroom.some(r => this.hasTimeConflict(newStart, newEnd, r.time))) {
      throw new HttpException('Horário em conflito com outra reserva na mesma sala.', HttpStatus.CONFLICT);
    }

    // Turma
    const reservationsClass = await this.reservationsRepository.getReservationsByDateAndClass(data.date, data.classId);
    if (reservationsClass.some(r => this.hasTimeConflict(newStart, newEnd, r.time))) {
      throw new HttpException('Turma já possui reserva nesse horário.', HttpStatus.CONFLICT);
    }

    // Usuário (professor)
    const reservationsUser = await this.reservationsRepository.getReservationsByDateAndUser(data.date, data.userId);
    if (reservationsUser.some(r => this.hasTimeConflict(newStart, newEnd, r.time))) {
      throw new HttpException('Professor já possui reserva nesse horário.', HttpStatus.CONFLICT);
    }
  }
}
