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
import { EquipmentsService } from './equipments.service';
import { CreateOrUpdateEquipmentsDTO } from './DTOs/create.or.update.equipments.dto';
import { Guard } from '../auth/guard';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentService: EquipmentsService) {}

  @Get('/')
  @HttpCode(200)
  getHealthEquipment() {
    return this.equipmentService.getHealthEquipment();
  }

  @UseGuards(Guard)
  @Post('create')
  @HttpCode(201)
  createEquipment(@Body() body: CreateOrUpdateEquipmentsDTO){
    return this.equipmentService.createEquipment(body);
  }

  // @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getEquipments(){
    return this.equipmentService.getEquipments();
  }

  @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getEquipmentByID(@Param('id', ParseIntPipe) id: number){
    return this.equipmentService.getEquipmentByID(id);
  }

  @UseGuards(Guard)
  @Get('list/:name')
  @HttpCode(200)
  getEquipmentByName(@Param('name') name: string){
    return this.equipmentService.getEquipmentByName(name);
  }

  // @UseGuards(Guard)
  // @Get('list/:tombNumber')
  // @HttpCode(200)
  // getEquipmentByTombNumber(@Param('tombNumber') tombNumber: string){
  //   return this.equipmentService.getEquipmentByTombNumber(tombNumber);
  // }

  @UseGuards(Guard)
  @Patch(':id/update')
  @HttpCode(200)
  updateEquipment(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: CreateOrUpdateEquipmentsDTO
    ){
      return this.equipmentService.updateEquipment(id, body);
  }

  @UseGuards(Guard)
  @Delete('list/:id')
  @HttpCode(204)
  deleteEquipment(@Param('id', ParseIntPipe) id: number){
    return this.equipmentService.deleteEquipment(id);
  }
}
