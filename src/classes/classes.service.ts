/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrUpdateClassesDTO } from './DTOs/create.or.update.classes.dto';
import { ClassesRepository } from './classes.repository';
import { removerAcentos } from '../common/global.functions';

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
    const classes = await this.classesRepository.getClasses();
    if (!classes) {
        throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);
    }
    const grades = classes.filter((classe) => {
      return classe.grade === Number(grade);
    })

    return grades;
}

  async getClassByClassName(className: string) {
    const classes = await this.classesRepository.getClasses();
    if (!classes)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    const classNames = classes.filter((classe) => {
      return classe.className.toLowerCase() === className.toLowerCase();
    })

    return classNames;
  }

  async getClassByShift(shift: string) {
    const classes = await this.classesRepository.getClasses();
    if (!classes)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    const shifts = classes.filter((classe) => {
      return removerAcentos(classe.shift).toLowerCase() === removerAcentos(shift).toLowerCase();
    })

    return shifts;
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

    return await this.classesRepository.updateClass(id, data);
  }

  async deleteClass(id: number) {
    const classExists = await this.classesRepository.getClassByID(id);
    if (!classExists)
      throw new HttpException('Turma não encontrada!', HttpStatus.NOT_FOUND);

    return await this.classesRepository.deleteClass(id);
  }
}
