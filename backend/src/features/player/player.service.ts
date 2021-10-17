import { isTrue, notNull } from '../../utils/validators';

import { ConflictException } from '../../exceptions/ConflictException';
import { GameState } from '../game/model/do/GameState';
import { GameStorage } from '../game/game.storage';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../exceptions/NotFoundException';
import { Player } from './model/do/Player';
import { PlayerChanges } from './model/do/PlayerChanges';
import { PlayerId } from './model/do/PlayerId';
import { PlayerState } from './model/do/PlayerState';
import { PlayerStorage } from './player.storage';
import { RegistrationId } from '../game/model/do/RegistrationId';

@Injectable()
export class PlayerService {
  constructor(
    private readonly storage: PlayerStorage,
    private readonly gameStorage: GameStorage,
  ) {}

  async create(registrationId: RegistrationId): Promise<PlayerId> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    notNull(game, new NotFoundException('GAME_NOT_FOUND'));
    isTrue(game.state === 'INIT', new ConflictException('GAME_SHOULD_BE_IN_INIT_STATUS'));
    const player = await this.storage.create(registrationId, game);
    return player.id;
  }

  async get(id: PlayerId): Promise<Player> {
    const player = await this.storage.find(id);
    notNull(player, new NotFoundException('PLAYER_NOT_FOUND'));
    isTrue(
      player.game.state === GameState.INIT || player.state === PlayerState.ACTIVE,
      new NotFoundException('PLAYER_NOT_FOUND'),
    );
    return player;
  }

  async update(id: PlayerId, changes: PlayerChanges): Promise<Player> {
    const player = await this.get(id);
    const newPlayer = await changes.apply(player);
    return this.storage.update(newPlayer);
  }
}
