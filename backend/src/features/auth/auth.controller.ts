import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Cookie, Cookies } from '../../utils/Cookies';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Cookies('auth-cookie') authCookie: Cookie<string>) {
    const accessToken = await this.authService.login(req.user);
    authCookie.update(accessToken, { httpOnly: true });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/auth/check_session')
  @HttpCode(HttpStatus.OK)
  async checkSession(@Request() req) {
    return true;
  }
}
