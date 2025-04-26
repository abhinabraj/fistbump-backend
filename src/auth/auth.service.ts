import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/utils/interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user && user.password !== pass) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetail } = user;
    const payload = { sub: userDetail.id, email: userDetail.email };
    return {
      user: userDetail,
      token: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user && user.password !== pass) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateUserByEmail(user: User) {
    const foundUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (!foundUser) {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    }
    return foundUser;
  }

  async login(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetail } = user;
    const payload = { sub: userDetail.id, email: userDetail.email };
    return {
      user: userDetail,
      token: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }

  async googleLogin(user: User) {
    const { ...userDetails } = user;
    const payload = { sub: userDetails.id, email: userDetails.email };
    return {
      user: userDetails,
      token: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
