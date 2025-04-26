import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { GoogleUserProfile } from 'src/utils/interface/user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL ?? '',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleUserProfile,
    done: VerifiedCallback,
  ) {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      googleProfileId: profile.id,
      picture: profile.photos[0].value,
    };
    try {
      const userData = await this.authService.validateUserByEmail(user);
      done(null, userData);
    } catch (error) {
      done(error, false);
    }
  }
}
