import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from './authenticated'; // Ajuste o caminho conforme necessário
import { Guard } from './guard';
import { GetUser } from './decorator/user-decorator';

@Controller('auth')
export class AuthController {
  @Get('validate')
  @UseGuards(Guard)
  validateToken(@GetUser() user: AuthenticatedUser) {
    return { message: 'Token válido', user };
  }
}
