import { Injectable } from '@nestjs/common';
import PlayerEntity, { PlayerId } from './player.entity';
import { PlayerStorage } from './player.storage';
import { RegistrationId } from '../game/game.entity';
import { throwIfTrue } from '../../utils/thorwIfTrue';
import NotFoundException from '../../exceptions/NotFoundException';
import { GameStorage } from '../game/game.storage';
import InvalidStateException from '../../exceptions/InvalidStateException';

@Injectable()
export class PlayerService {
  constructor(
    private readonly storage: PlayerStorage,
    private readonly gameStorage: GameStorage,
  ) {}

  async create(registrationId: RegistrationId): Promise<PlayerId> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(game.gameState !== 'INIT', new InvalidStateException('INVALID_GAME_STATE'));

    const player = await this.storage.create(registrationId);
    return player.id;
  }

  async get(id: PlayerId): Promise<PlayerEntity> {
    const player = await this.storage.find(id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));
    return player;
  }

  async update(player: PlayerEntity): Promise<PlayerEntity> {
    const game = await this.gameStorage.findByPlayerId(player.id);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(game.gameState !== 'INIT', new InvalidStateException('INVALID_GAME_STATE'));

    const persisted = await this.storage.find(player.id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));

    return await this.storage.update({
      ...persisted,
      playerState: 'ACTIVE',
      name: player.name,
      wish: player.wish,
      dontWish: player.dontWish,
    });
  }
}

