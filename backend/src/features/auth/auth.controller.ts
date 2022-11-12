import {
  Controller,
  HttpCode,
  HttpStatus, NotFoundException,
  Post,
  Request, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Cookie, Cookies } from '../../utils/Cookies';

import { AuthService } from './auth.service';
import { GameStorage } from '../game/game.storage';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { PlayerStorage } from '../player/player.storage';
import { GameId } from '../game/model/do/GameId';
import { PlayerId } from '../player/model/do/PlayerId';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly gameStorage: GameStorage,
    private readonly playerStorage: PlayerStorage,
  ) {}

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
  async checkSession(@Request() request) {
    const userId = request.url.split('/')[3] || request.body.username;
    if (request.user.id == userId) {
      return true
    }
    const game = await this.gameStorage.find(new GameId(userId));
    if (game) {
      throw new UnauthorizedException();
    }
    const player = await this.playerStorage.find(new PlayerId(userId));
    if (player) {
      throw new UnauthorizedException();
    }
    throw new NotFoundException();
  }
}
