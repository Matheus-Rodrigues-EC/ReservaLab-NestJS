/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/create.user.dto';
import { LoginUserDTO } from './DTOs/login.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';
// import { DeleteUserDTO } from './DTOs/delete.user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
// import { AuthenticatedUser } from '../auth/authenticated';
import { removerAcentos } from '../common/global.functions';

const validateHeadMaster = (data: UpdateUserDTO, usersList: Array<any>) => {
  return usersList.filter((user) => user.rulets === data.rulets && user.name !== data?.name)
}

const validateCordinator = (data: UpdateUserDTO, usersList: Array<any>) => {
  return usersList.filter((user) => user.rulets === data.rulets && user.name !== data?.name)
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  getHealthUser(): string {
    return 'User is Okay!';
  }

  async createUser(data: CreateUserDTO) {
    const userExists = await this.userRepository.getUserByEmail(data.email);
    if (userExists)
      throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);

    return await this.userRepository.createUser(data);
  }

  async loginUser(data: LoginUserDTO) {
    const userExists = await this.userRepository.getUserByEmail(data.email);
    if (!userExists)
      throw new HttpException(
        'Email não cadastrado',
        HttpStatus.NOT_FOUND,
      );

    const validatePassword = bcrypt.compareSync(data.password, userExists.password);
    if (!validatePassword)
      throw new HttpException(
        'Email e/ou senha estão incorretos',
        HttpStatus.UNAUTHORIZED,
      );

      const user = {
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
        surname: userExists.surname,
        rulets: userExists.rulets,
        subject: userExists.subject,
      }
      const token = this.generateToken(userExists);

    return {user, token};
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUserByID(id: number) {
    const userExists = await this.userRepository.getUserByID(id);
    if (!userExists)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return userExists;
  }

  async getUserByEmail(email: string) {
    const userExists = await this.userRepository.getUserByEmail(email);
    if (!userExists)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return userExists;
  }

  async getUserBySurname(surname: string) {
    const users = await this.userRepository.getUsers();
    const Surname = users.find((user) => {
      return removerAcentos(user?.surname || "").toLowerCase() === removerAcentos(surname).toLowerCase();
    })
    if (!Surname)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return Surname;
  }

  async updateUser(id: number, data: UpdateUserDTO) {
    const userExists = await this.userRepository.getUserByID(id);
    if (!userExists)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const usersExistsRulets = await this.userRepository.getUsers();
    if(data?.rulets === "Diretor(a)"){
      const existsHeadMaster = validateHeadMaster(data, usersExistsRulets);
      if (existsHeadMaster.length >= 1)
        throw new HttpException('Já existe um diretor cadastrado.', HttpStatus.FORBIDDEN)
    }

    if(data?.rulets === "Coordenador(a)"){
      const existsCoordinators = validateCordinator(data, usersExistsRulets);
      if (existsCoordinators.length >= 2)
        throw new HttpException('Máximo de 2 coordenadores, já cadastrados.', HttpStatus.FORBIDDEN)
    }

    return await this.userRepository.updateUserByID(id, data);
  }

  async updateUserPassword(id: number, data: UpdatePasswordUserDTO) {
    const userExists = await this.userRepository.getUserByIDToUpdate(id);
    console.log('user: ', userExists);
    console.log('id: ', id);
    console.log('Data: ', data);
    if (!userExists)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    
    const validatePassword = bcrypt.compareSync(data.CurrentPassword, userExists.password);
    if (!validatePassword)
      throw new HttpException(
        'A senha informada está incorreta',
        HttpStatus.UNAUTHORIZED,
      );

    return await this.userRepository.updatePasswordById(id, data);
  }

  async deleteUser(userID: number) {
    const UserId = await this.userRepository.getUserByID(userID);
    if (!UserId)
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.NOT_FOUND,
      );

    return await this.userRepository.deleteUserByID(userID);
  }

  private generateToken(user: User) {
    const { id, email, name } = user;
    return {
      token: this.jwtService.sign(
        {
          email,
          name,
        },
        { subject: String(id) },
      ),
    };
  }

  verifyToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tokenData = this.jwtService.verify(token);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return { ...tokenData, sub: parseInt(tokenData.sub) } as {
      email: string;
      name: string;
      sub: number;
    };
  }
}
