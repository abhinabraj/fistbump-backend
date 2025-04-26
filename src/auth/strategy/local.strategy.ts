import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  validate(email: string, password: string): Promise<any> {
    const user = this.authService.validateUser(email, password);
    console.log(user, '@user inisde local startegy validate');
    if (!user) {
      throw new Error('Email or password is invalid');
    }

    return Promise.resolve(user);
  }
}
