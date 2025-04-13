import { AuthenticatedUser } from '../auth/authenticated'; // ajuste o caminho se necessário

declare module 'express' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
