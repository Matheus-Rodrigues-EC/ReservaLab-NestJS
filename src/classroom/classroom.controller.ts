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
import { ClassroomService } from './classroom.service';
import { CreateOrUpdateClassroomDTO } from './DTOs/create.or.update.classroom.dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Get('/')
  @HttpCode(200)
  getHealthClassroom() {
    return this.classroomService.getHealthClassroom();
  }

  // @UseGuards(Guard)
  @Post('/')
  @HttpCode(201)
  createClassroom(@Body() body: CreateOrUpdateClassroomDTO) {
    return this.classroomService.createClassroom(body);
  }

  // @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getClassrooms() {
    return this.classroomService.getClassrooms();
  }

  // @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getClassroomByID(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.getClassroomByID(id);
  }

  // @UseGuards(Guard)
  @Get('list/:name')
  @HttpCode(200)
  getClassroomByName(name: string) { // TODO - Atenção a essa linha de código, verificar função
    return this.classroomService.getClassroomByName(name);
  }

  // @UseGuards(Guard)
  @Put(':classroom/update')
  @HttpCode(200)
  updateClassroom( @Param('id', ParseIntPipe) id: number,
  @Body() body: CreateOrUpdateClassroomDTO) {
    return this.classroomService.updateClassroom(id, body);
  }

  // @UseGuards(Guard)
  @Delete('/')
  @HttpCode(204)
  deleteClassroom(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.deleteClassroom(id);
  }
}
