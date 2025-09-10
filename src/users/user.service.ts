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
import { MailerService } from '@nestjs-modules/mailer';
// import { AuthenticatedUser } from '../auth/authenticated';
import { removerAcentos } from '../common/global.functions';

const validateHeadMaster = (data: UpdateUserDTO, usersList: Array<any>) => {
  return usersList.filter((user) => user.rulets === data.rulets && user.name !== data?.name)
}

const validateCordinator = (data: UpdateUserDTO, usersList: Array<any>) => {
  return usersList.filter((user) => user.rulets === data.rulets && user.name !== data?.name)
}

const generateStrongPassword = (length: number = 12): string => {
  if (length < 8 || length > 25) {
    throw new Error('O tamanho da senha deve ser entre 8 e 25 caracteres.');
  }

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specials = '!@#$%^&*()-_=+[]{};:,.<>?';

  // Garante pelo menos um de cada tipo
  const password = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specials[Math.floor(Math.random() * specials.length)],
  ];

  const all = upper + lower + numbers + specials;
  for (let i = password.length; i < length; i++) {
    password.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Embaralha a senha para garantir aleatoriedade
  return password
    .sort(() => Math.random() - 0.5)
    .join('');
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }

  getHealthUser(): string {
    return 'User is Okay!';
  }

  async createUser(data: CreateUserDTO) {
    const userExists = await this.userRepository.getUserByEmail(data.email);
    if (userExists)
      throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);

    await this.mailerService.sendMail({
      to: data?.email,
      subject: "Criação de Cadastro",
      html: `
<p>👋 Olá <b>${data?.name}</b>,</p>

<p>Parabéns! Sua conta no ReservaLab foi criada com sucesso. 😁</p>

<p>Seja bem-vindo(a) ao ReservaLab! Estamos felizes em tê-lo(a) conosco. 🤝</p>

<p>Sua conta foi criada com os seguintes detalhes:</p>
<ul>
  <li><b>👤 Nome:</b> ${data?.name}</li>
  <li><b>📧 Email:</b> ${data?.email}</li>
  <li><b>🔒 Senha:</b> ${data?.password}</li>
</ul>
<p>Por segurança, recomendamos que você acesse o sistema e altere sua senha assim que possível. 🧑‍💻</p>

<p>Se você não solicitou seu cadastro, entre em contato com o suporte imediatamente. 🕵️</p>

<p>Atenciosamente,</p>
<p>Equipe ReservaLab</p>
`
    });

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
      shift: userExists.shift,
      rulets: userExists.rulets,
      subject: userExists.subject,
    }
    const token = this.generateToken(userExists);

    return { user, token };
  }

  async googleloginUser(data: LoginUserDTO) {
    const userExists = await this.userRepository.getUserByEmail(data.email);
    if (!userExists)
      throw new HttpException(
        'Email não cadastrado',
        HttpStatus.NOT_FOUND,
      );

    if (data?.email === userExists?.email) {
      if (userExists?.google_client_id === null || userExists?.google_client_id === undefined) {
        await this.mailerService.sendMail({
          to: userExists?.email,
          subject: "Atualização de Cadastro",
          html: `
<p>👋 Olá <b>${userExists?.name}</b>,</p>

<p>Uma atualização de cadastro foi feita para a sua conta no ReservaLab.</p>

<p>Seu email Google foi associado à conta, e você poderá fazer login diretamente pelo Google. 😁</p>

<p>Se você não solicitou essa alteração, entre em contato com o suporte imediatamente. 🕵️</p>

<p>Atenciosamente,</p>
<p>Equipe ReservaLab</p>
`
        });

        await this.updateUser(userExists.id, { google_client_id: data?.google_client_id } as UpdateUserDTO);
      }
    }
    else if (data?.google_client_id !== userExists?.google_client_id)
      throw new HttpException(
        'Erro ao identificar conta Google',
        HttpStatus.UNAUTHORIZED,
      );

    const user = {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      surname: userExists.surname,
      shift: userExists.shift,
      rulets: userExists.rulets,
      subject: userExists.subject,
    }
    const token = this.generateToken(userExists);

    return { user, token };
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
    if (data?.rulets === "Diretor(a)") {
      const existsHeadMaster = validateHeadMaster(data, usersExistsRulets);
      if (existsHeadMaster.length >= 1)
        throw new HttpException('Já existe um diretor cadastrado.', HttpStatus.FORBIDDEN)
    }

    if (data?.rulets === "Coordenador(a)") {
      const existsCoordinators = validateCordinator(data, usersExistsRulets);
      if (existsCoordinators.length >= 2)
        throw new HttpException('Máximo de 2 coordenadores, já cadastrados.', HttpStatus.FORBIDDEN)
    }

    return await this.userRepository.updateUserByID(id, data);
  }

  async updateUserPassword(id: number, data: UpdatePasswordUserDTO) {
    const userExists = await this.userRepository.getUserByIDToUpdate(id);
    // console.log('user: ', userExists);
    // console.log('id: ', id);
    // console.log('Data: ', data);
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

  async RecoverPassword(email: string) {

    const userExists = await this.userRepository.getUserByEmail(email);
    if (!userExists)
      throw new HttpException('Email não cadastrado no sistema!', HttpStatus.NOT_FOUND);

    const password = generateStrongPassword();

    const recoverPassword = await this.userRepository.recoverPasswordByEmail(email, password);
    if (!recoverPassword)
      throw new HttpException('Erro ao recuperar a senha!', HttpStatus.INTERNAL_SERVER_ERROR);

    await this.mailerService.sendMail({
      to: email,
      subject: "Recuperação de Senha",
      html: `
<p>👋 Olá <b>${userExists.name}</b>,</p>

<p>Você solicitou a recuperação de senha para sua conta no ReservaLab. ♻️</p>

<p>Sua nova senha temporária é:🔒 <b>${password}</b></p>

<p>Por segurança, recomendamos que você acesse o sistema e altere sua senha assim que possível. 🧑‍💻</p>

<p>Se você não solicitou essa alteração, entre em contato com o suporte imediatamente. 🕵️</p>

<p>Atenciosamente,</p>
<p>Equipe ReservaLab</p>
`
    });
    return 'Email de recuperação enviado';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return { ...tokenData, sub: parseInt(tokenData.sub) } as {
      email: string;
      name: string;
      sub: number;
    };
  }
}
