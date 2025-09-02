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
import { UserService } from './user.service';
import { CreateUserDTO } from './DTOs/create.user.dto';
import { LoginUserDTO } from './DTOs/login.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';
import { RecoverPasswordUserDTO } from './DTOs/recover.password.user.dto';
// import { MailerService } from '@nestjs-modules/mailer';
// import { DeleteUserDTO } from './DTOs/delete.user.dto';
// import { AuthenticatedUser } from '../auth/authenticated';
// import { UserDecorator } from '../auth/decorator/user.decorator';
import { Guard } from '../auth/guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly mailerService: MailerService
  ) { }

  @Get('/')
  @HttpCode(200)
  getHealthUser() {
    return this.userService.getHealthUser();
  }

  @Post('register')
  @HttpCode(201)
  signUp(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @Post('login')
  @HttpCode(200)
  signIn(@Body() body: LoginUserDTO) {
    return this.userService.loginUser(body);
  }

  @Post('google/login')
  @HttpCode(200)
  signInWithGoogle(@Body() body: LoginUserDTO) {
    return this.userService.googleloginUser(body);
  }

  @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(Guard)
  @Get('list/:id')
  @HttpCode(200)
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    // @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.getUserByID(id);
  }

  // @UseGuards(Guard)
  @Get('list/email/:email')
  @HttpCode(200)
  getUserByEmail(
    @Param('email') email: string,
    // @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(Guard)
  @Get('list/surname/:surname')
  @HttpCode(200)
  getUserBySurname(
    @Param('surname') surname: string,
    // @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.getUserBySurname(surname);
  }

  @UseGuards(Guard)
  @Patch(':id/update')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
    // @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Patch('/recover-password')
  async recoverPassword(@Body() body: RecoverPasswordUserDTO): Promise<string> {
    return this.userService.RecoverPassword(body.email);
  }

  @UseGuards(Guard)
  @Patch(':id/update-password')
  @HttpCode(200)
  updateUserPassword(
    @Body() body: UpdatePasswordUserDTO,
    @Param('id', ParseIntPipe) id: number,
    // @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.updateUserPassword(id, body);
  }

  @UseGuards(Guard)
  @Delete('list/:id')
  @HttpCode(204)
  deleteCredential(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.deleteUser(id);
  }
}
