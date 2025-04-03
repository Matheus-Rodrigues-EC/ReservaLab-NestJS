/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrUpdateClassroomDTO } from './DTOs/create.or.update.classroom.dto';
import { ClassroomRepository } from './classroom.repository';
import { removerAcentos } from '../common/global.functions';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly classroomRepository: ClassroomRepository,
  ) {}

  getHealthClassroom(): string {
    return 'Classrooms is Okay!';
  }

  async createClassroom(data: CreateOrUpdateClassroomDTO) {
    const classroomExists = await this.classroomRepository.getClassroomByName(data.name);
    if (classroomExists)
      throw new HttpException('Sala já cadastrada', HttpStatus.CONFLICT);

    return await this.classroomRepository.createClassroom(data)
  }

  async getClassrooms() {
    return await this.classroomRepository.getClassrooms();
  }

  async getClassroomByID(id: number) {
    const classroomExists = await this.classroomRepository.getClassroomByID(id);
    if (!classroomExists)
      throw new HttpException('Sala não encontrada!', HttpStatus.NOT_FOUND);

    return classroomExists;
  }

  async getClassroomByName(name: string) {
    const classrooms = await this.classroomRepository.getClassrooms();
    if (!classrooms)
      throw new HttpException('Sala não encontrada!', HttpStatus.NOT_FOUND);

    const classRoomName = classrooms.find((classroom) => {
      return removerAcentos(classroom.name).toLowerCase() === removerAcentos(name).toLowerCase();
    })

    return classRoomName;
  }

  async updateClassroom(id: number, data: CreateOrUpdateClassroomDTO) {
    const classroomExists = await this.classroomRepository.getClassroomByID(id);
    if (!classroomExists)
      throw new HttpException('Sala não encontrada!', HttpStatus.NOT_FOUND);

    return await this.classroomRepository.updateClassroom(id, data);
  }

  async deleteClassroom(id: number) {
    const classroomExists = await this.classroomRepository.getClassroomByID(id);
    if (!classroomExists)
      throw new HttpException('Sala não encontrada!', HttpStatus.NOT_FOUND);

    return await this.classroomRepository.deleteClassroom(id);
  }
}
