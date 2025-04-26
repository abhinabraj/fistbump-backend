import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/users.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
