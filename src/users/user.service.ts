/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/create.user.dto';
import { LoginUserDTO } from './DTOs/login.user.dto';
import { UpdateUserDTO } from './DTOs/update.user.dto';
import { UpdatePasswordUserDTO } from './DTOs/update.password.user.dto';
import { DeleteUserDTO } from './DTOs/delete.user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from '../common/authenticated';
import { removerAcentos } from '../common/global.functions';

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

    return await this.userRepository.updateUserByID(id, data);
  }

  async updateUserPassword(id: number, data: UpdatePasswordUserDTO) {
    const userExists = await this.userRepository.getUserByID(id);
    console.log('user: ', userExists);
    console.log('id: ', id);
    console.log('Data: ', data);
    if (!userExists)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    
    // @Abcd1234
    const validatePassword = bcrypt.compareSync(data.CurrentPassword, userExists.password);
    if (!validatePassword)
      throw new HttpException(
        'A senha informada está incorreta',
        HttpStatus.UNAUTHORIZED,
      );

    return await this.userRepository.updatePasswordById(id, data);
  }

  async deleteUser(
    userID: number,
    data: DeleteUserDTO,
    loggedUser: AuthenticatedUser,
  ) {
    const UserId = await this.userRepository.getUserByID(userID);
    if (UserId?.id !== loggedUser.id)
      throw new HttpException(
        'Você não tem permissão para deletar esse usuário.',
        HttpStatus.UNAUTHORIZED,
      );

    const userExists = await this.userRepository.getUserByEmail(
      loggedUser.email,
    );
    if (!userExists)
      throw new HttpException(
        'Email e/ou senha estão incorretos',
        HttpStatus.UNAUTHORIZED,
      );

    const validatePassword = bcrypt.hashSync(
      data.password,
      userExists.password,
    );
    if (!validatePassword)
      throw new HttpException(
        'Email and/or password incorrect',
        HttpStatus.UNAUTHORIZED,
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
