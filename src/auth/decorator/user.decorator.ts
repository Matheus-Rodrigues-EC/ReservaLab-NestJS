/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { Response } from 'express';

export const UserDecorator = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const { locals } = context.switchToHttp().getResponse<Response>();
    if (!locals.user) {
      throw new NotFoundException('User not found!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return locals.user;
  },
);
