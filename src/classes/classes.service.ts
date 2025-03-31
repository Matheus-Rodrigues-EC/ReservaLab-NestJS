/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrUpdateClassesDTO } from './DTOs/create.or.update.classes.dto';
import { ClassesRepository } from './classes.repository';

@Injectable()
export class ClassesService {
  constructor(
    private readonly classesRepository: ClassesRepository,
  ) {}
  
  getHealthClasses(): string {
    return 'Classes is Okay!';
  }

  async createClasses(data: CreateOrUpdateClassesDTO) {
    const classExists =  await this.classesRepository.getClassFull(data.grade, data.className, data.shift);
    if (classExists) 
      throw new HttpException('Turma já cadastrada', HttpStatus.CONFLICT);

    return await this.classesRepository.createClasses(data);
  }

  async getClasses() {
    return await this.classesRepository.getClasses();
  }

  async getClassByID(id: number) {
    const classExists = await this.classesRepository.getClassByID(id);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return classExists;
  }

  async getClassByGrade(grade: number) {
    const classExists = await this.classesRepository.getClassByGrade(grade);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return classExists;
  }

  async getClassByClassName(className: string) {
    const classExists = await this.classesRepository.getClassByClassName(className);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return classExists;
  }

  async getClassByShift(shift: string) {
    const classExists = await this.classesRepository.getClassByShift(shift);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return classExists;
  }

  async getClassFull(grade: number, className: string, shift: string) {
    const classExists = await this.classesRepository.getClassFull(grade, className, shift);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return classExists;
  }

  async updateClass(id: number, data: CreateOrUpdateClassesDTO) {
    const classExists = await this.classesRepository.getClassByID(id);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return this.classesRepository.updateClass(id, data);
  }

  async deleteClass(id: number) {
    const classExists = await this.classesRepository.getClassByID(id);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return await this.classesRepository.deleteClass(id);
  }
}
