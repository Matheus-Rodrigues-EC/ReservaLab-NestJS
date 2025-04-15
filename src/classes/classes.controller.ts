/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  HttpCode,
  Delete,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateOrUpdateClassesDTO } from './DTOs/create.or.update.classes.dto';
import { Guard } from '../auth/guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('/')
  @HttpCode(200)
  getHealthClasses() {
    return this.classesService.getHealthClasses();
  }

  @UseGuards(Guard)
  @Post('create')
  @HttpCode(201)
  createClass(@Body() body: CreateOrUpdateClassesDTO) {
    return this.classesService.createClasses(body);
  }

  @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getClasses() {
    return this.classesService.getClasses();
  }

  @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getClassesByID(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.getClassByID(id);
  }

  @UseGuards(Guard)
  @Get('list/grade/:grade')
  @HttpCode(200)
  getClassesByGrade(@Param('grade', ParseIntPipe) grade: number) {
    return this.classesService.getClassByGrade(grade);
  }

  @UseGuards(Guard)
  @Get('list/classname/:className')
  @HttpCode(200)
  getClassByClassName(@Param('className') className: string) {
    return this.classesService.getClassByClassName(className);
  }

  @UseGuards(Guard)
  @Get('list/shifts/:shift')
  @HttpCode(200)
  getClassByShift(@Param('shift') shift: string) {
    return this.classesService.getClassByShift(shift);
  }

  @UseGuards(Guard)
  @Patch(':id/update')
  @HttpCode(200)
  updateClass(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateOrUpdateClassesDTO
  ) {
    return this.classesService.updateClass(id, body);
  }

  @UseGuards(Guard)
  @Delete(':id')
  @HttpCode(204)
  deleteClass(@Param('id', ParseIntPipe) id: number) {
    return this.classesService.deleteClass(id);
  }
}