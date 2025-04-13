/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';

export type AuthenticatedUser = Omit<
  User,
  'password' | 'createdAt' | 'updatedAt'
>;
