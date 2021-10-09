import {
  GameId as GameIdVo,
  GamePin as GamePinVo,
  PlayerId as PlayerIdVo,
  PlayerPin as PlayerPinVo,
} from 'model';

import { GameId } from '../game/model/do/GameId';
import { GameStorage } from '../game/game.storage';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayerId } from '../player/model/do/PlayerId';
import { PlayerStorage } from '../player/player.storage';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private gameStorage: GameStorage,
    private playerStorage: PlayerStorage,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validate(id: GameIdVo | PlayerIdVo, pin: PlayerPinVo | GamePinVo): Promise<any> {
    let user: { password: any; id: { value: string } } = await this.gameStorage.find(
      new GameId(id),
    );

    if (!user) {
      user = await this.playerStorage.find(new PlayerId(id));
    }

    if (
      user &&
      (!user.password ||
        (await this.passwordService.comparePinAndPassword(pin, user.password.value)))
    ) {
      return {
        id: user.id.value,
      };
    }

    return null;
  }

  async login(user: { id: string }) {
    const payload = { id: user.id };
    return this.jwtService.sign(payload);
  }
}
