import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../users/user.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(private readonly usersService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException(
        'A autorização deve ser fornecida pelo provedor!',
      );
    }

    try {
      const token = authorization?.split(' ')[1];
      if (!token)
        throw new UnauthorizedException('O token deve ser o enviado!');

      const data = this.usersService.verifyToken(token);
      const user = await this.usersService.getUserByID(data.sub);
      response.locals.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
