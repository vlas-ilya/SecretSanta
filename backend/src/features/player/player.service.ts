import PlayerEntity, { PlayerId, PlayerPassword } from './player.entity';

import { GameStorage } from '../game/game.storage';
import IncorrectPasswordException from '../../exceptions/incorrect-password.exception';
import { Injectable } from '@nestjs/common';
import InvalidStateException from '../../exceptions/invalid-state.exception';
import NotFoundException from '../../exceptions/not-found.exception';
import Player from './player.entity';
import { PlayerStorage } from './player.storage';
import { RegistrationId } from '../game/game.entity';
import { throwIfTrue } from '../../utils/thorw-if-true';

@Injectable()
export class PlayerService {
  constructor(
    private readonly storage: PlayerStorage,
    private readonly gameStorage: GameStorage,
  ) {}

  private static checkPassword(player: Player, password: PlayerPassword): void {
    throwIfTrue(
      player.password != null && player.password != password,
      new IncorrectPasswordException('INCORRECT_PLAYER_PASSWORD'),
    );
  }

  async create(
    registrationId: RegistrationId,
    password: PlayerPassword,
  ): Promise<PlayerId> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(
      game.gameState !== 'INIT',
      new InvalidStateException('INVALID_GAME_STATE'),
    );

    const player = await this.storage.create(registrationId, password);
    return player.id;
  }

  async get(id: PlayerId, password: PlayerPassword): Promise<PlayerEntity> {
    const player = await this.storage.find(id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));
    PlayerService.checkPassword(player, password);
    return player;
  }

  async update(
    player: PlayerEntity,
    password: PlayerPassword,
  ): Promise<PlayerEntity> {
    const game = await this.gameStorage.findByPlayerId(player.id);
    const persisted = await this.storage.find(player.id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));

    PlayerService.checkPassword(player, password);

    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(
      game.gameState !== 'INIT',
      new InvalidStateException('INVALID_GAME_STATE'),
    );

    return await this.storage.update({
      ...persisted,
      playerState: 'ACTIVE',
      name: player.name,
      wish: player.wish,
      taboo: player.taboo,
    });
  }
}
