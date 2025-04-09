/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationsRepository } from '../reservations.repository';
// import { CreateOrUpdateReservationDTO } from '../DTOs/create.or.update.reservations.dto';

@Injectable()
export class ReservationsConflictService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {}

  private parseTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private parseTimeInterval(time: string) {
    const [start, end] = time.split(' - ');
    return {
      startMinutes: this.parseTimeToMinutes(start),
      endMinutes: this.parseTimeToMinutes(end),
    };
  }

  private hasTimeConflict(
    newStartMinutes: number,
    newEndMinutes: number,
    existingTime: string
  ): boolean {
    const { startMinutes: existingStart, endMinutes: existingEnd } = this.parseTimeInterval(existingTime);
  
    const conflict = newStartMinutes < existingEnd && newEndMinutes > existingStart;
  
    // console.log('Comparando nova reserva:', newStartMinutes, newEndMinutes);
    // console.log('Com reserva existente:', existingStart, existingEnd);
    // console.log('Conflito:', conflict);
  
    return conflict;
  }

  private hasDateConflict(dateToCheck: string, existingReservations: { date: string }[]): boolean {
    const normalizedInputDate = new Date(dateToCheck).toISOString().split('T')[0];
    console.log('Data enviada:', dateToCheck);
  
    const conflict = existingReservations.find(item => {
      const normalizedItemDate = new Date(item.date).toISOString().split('T')[0];
      return normalizedItemDate === normalizedInputDate;
    });
  
    // console.log('Data enviada:', normalizedInputDate);
    // console.log('Conflito encontrado:', conflict);
  
    return !!conflict;
  }
  
  
  async validateNoConflicts(data: {
    date: string;
    time: string;
    classroomId: number;
    classId: number;
    userId: number;
  }) {
    const { startMinutes: newStart, endMinutes: newEnd } = this.parseTimeInterval(data.time);

    // Sala
    const reservationsClassroom = await this.reservationsRepository.getReservationsByDateAndClassroom(data.date, data.classroomId);
    if (reservationsClassroom.some(r => this.hasTimeConflict(newStart, newEnd, r.time)) && (this.hasDateConflict(data.date, reservationsClassroom))) {
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
