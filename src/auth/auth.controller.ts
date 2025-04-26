import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { SignInDto } from './dtos/sign-in.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { Request, Response } from 'express';
// import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Get('login-with-google')
  @UseGuards(GoogleOAuthGuard)
  googleSignIn() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.googleLogin(req.user);
    res.redirect(
      `${process.env.GOOGLE_FRONTEND_REDIRECT_URL}?access_token=${response.token.access_token}`,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Req() req: Request) {
    console.log(req.user, '@req.user inside get user profile');
    return req.user;
  }
}
