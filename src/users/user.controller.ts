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
import { UserService } from './user.service';
import { CreateUserDTO } from './DTOs/create.user.dto';
import { LoginUserDTO } from './DTOs/login.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';
import { DeleteUserDTO } from './DTOs/delete.user.dto';
import { AuthenticatedUser } from '../common/authenticated';
import { UserDecorator } from '../common/user.decorator';
// import { Guard } from '../common/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  // @UseGuards(Guard)
  @Get('list')
  @HttpCode(200)
  getUsers() {
    return this.userService.getUsers();
  }

  // @UseGuards(Guard)
  @Get(':id')
  @HttpCode(200)
  getUserById(@UserDecorator() user: AuthenticatedUser) {
    return this.userService.getUserByID(user.id);
  }

  // @UseGuards(Guard)
  @Get(':id')
  @HttpCode(200)
  getUserByEmail(@UserDecorator() user: AuthenticatedUser) {
    return this.userService.getUserByEmail(user.email);
  }

  // @UseGuards(Guard)
  @Get(':id')
  @HttpCode(200)
  getUserBySurname(@UserDecorator() user: AuthenticatedUser) {
    return this.userService.getUserBySurname(user.surname || '');
  }

  // @UseGuards(Guard)
  @Put(':user/:id')
  @HttpCode(200)
  updateUser(
    @Body() body: UpdateUserDTO,
    @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.updateUser(user.id, body);
  }

  // @UseGuards(Guard)
  @Put('user/:id/update-password')
  @HttpCode(200)
  updateUserPassword(
    @Body() body: UpdatePasswordUserDTO,
    @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.updateUserPassword(user.id, body);
  }

  // @UseGuards(Guard)
  @Delete(':id')
  @HttpCode(204)
  deleteCredential(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeleteUserDTO,
    @UserDecorator() user: AuthenticatedUser,
  ) {
    return this.userService.deleteUser(id, body, user);
  }
}
