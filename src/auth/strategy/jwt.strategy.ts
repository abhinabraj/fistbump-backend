import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: {
    sub: number;
    email: number;
    iat: string;
    exp: string;
  }): Promise<UserEntity> {
    const foundUser = await this.userService.getUserById(payload.sub);
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }
}
