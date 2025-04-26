import { User } from './utils/interface/user.interface';

declare module 'express' {
  interface Request {
    user: User;
  }
}
