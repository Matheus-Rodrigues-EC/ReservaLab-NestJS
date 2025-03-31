/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpCode,
  Delete,
  // UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateOrUpdateClassesDTO } from './DTOs/create.or.update.classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('/')
  @HttpCode(200)
  getHealthClasses() {
    return this.classesService.getHealthClasses();
  }

  @Post('class/create')
  @HttpCode(201)
  createClass(@Body() body: CreateOrUpdateClassesDTO) {
    return this.classesService.createClasses(body);
  }

  // @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getClasses() {
    return this.classesService.getClasses();
  }

  // @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getClassesByID(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.getClassByID(id);
  }

  // @UseGuards(Guard)
  @Get('list/grade')
  @HttpCode(200)
  getClassesByGrade(@Param('grade', ParseIntPipe) grade: number) {
    return this.classesService.getClassByGrade(grade);
  }

  // @UseGuards(Guard)
  @Get('list/classes')
  @HttpCode(200)
  getClassByClassName(className: string) { // TODO - Atenção a essa linha de código, verificar função
    return this.classesService.getClassByClassName(className);
  }

  // @UseGuards(Guard)
  @Get('list/shifts')
  @HttpCode(200)
  getClassByShift(shift: string) { // TODO - Atenção a essa linha de código, verificar função
    return this.classesService.getClassByShift(shift);
  }

  // @UseGuards(Guard)
  @Put(':class/update')
  @HttpCode(200)
  updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateOrUpdateClassesDTO
  ) {
    return this.classesService.updateClass(id, body);
  }

  // @UseGuards(Guard)
  @Delete(':class/update')
  @HttpCode(204)
  DeleteClass(
    @Param('id', ParseIntPipe) id: number,) {
    return this.classesService.deleteClass(id);
  }
}