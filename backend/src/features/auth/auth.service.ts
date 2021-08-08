import { GameIdVo, GamePinVo } from '../game/model/vo/GameVo';
import { PlayerIdVo, PlayerPinVo } from '../player/model/vo/PlayerVo';

import { GameId } from '../game/model/do/GameId';
import { GameService } from '../game/game.service';
import { GameStorage } from '../game/game.storage';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayerId } from '../player/model/do/PlayerId';
import { PlayerService } from '../player/player.service';
import { PlayerStorage } from '../player/player.storage';

@Injectable()
export class AuthService {
  constructor(
    private gameStorage: GameStorage,
    private playerStorage: PlayerStorage,
    private jwtService: JwtService,
  ) {}

  async validate(
    id: GameIdVo | PlayerIdVo,
    password: PlayerPinVo | GamePinVo,
  ): Promise<any> {
    let user: { password: any; id: { value: string } } = await this.gameStorage.find(
      new GameId(id),
    );

    if (!user) {
      user = await this.playerStorage.find(new PlayerId(id));
    }

    if (user && (!user.password || user.password.value === password)) {
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