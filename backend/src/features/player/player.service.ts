import { PlayerId, PlayerPassword } from '../../model/PlayerTypes';

import { ChangePlayerPasswordMessage } from '../../model/ChangePlayerPasswordMessage';
import { GameStorage } from '../game/game.storage';
import IncorrectPasswordException from '../../exceptions/incorrect-password.exception';
import { Injectable } from '@nestjs/common';
import InvalidStateException from '../../exceptions/invalid-state.exception';
import NotFoundException from '../../exceptions/not-found.exception';
import PlayerDto from '../../model/PlayerDto';
import { PlayerStorage } from './player.storage';
import { RegistrationId } from '../../model/GameTypes';
import { throwIfTrue } from '../../utils/thorw-if-true';

@Injectable()
export class PlayerService {
  constructor(private readonly storage: PlayerStorage, private readonly gameStorage: GameStorage) {}

  private static checkPassword(player: PlayerDto, password: PlayerPassword): void {
    throwIfTrue(
      player.password != null && player.password != password,
      new IncorrectPasswordException('INCORRECT_PLAYER_PASSWORD'),
    );
  }

  async create(registrationId: RegistrationId): Promise<PlayerId> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(game.gameState !== 'INIT', new InvalidStateException('INVALID_GAME_STATE'));

    const player = await this.storage.create(registrationId);
    return player.id;
  }

  async get(id: PlayerId, password: PlayerPassword): Promise<PlayerDto> {
    const player = await this.storage.find(id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));
    PlayerService.checkPassword(player, password);
    return player;
  }

  async update(player: PlayerDto, password: PlayerPassword): Promise<PlayerDto> {
    const game = await this.gameStorage.findByPlayerId(player.id);
    const persisted = await this.storage.find(player.id);
    throwIfTrue(!player, new NotFoundException('PLAYER_NOT_FOUND'));
    PlayerService.checkPassword(player, password);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(game.gameState !== 'INIT', new InvalidStateException('INVALID_GAME_STATE'));

    return await this.storage.update({
      ...persisted,
      playerState: 'ACTIVE',
      name: player.name,
      wish: player.wish,
      taboo: player.taboo,
    });
  }

  async changePassword(
    id: PlayerId,
    changePasswordMessage: ChangePlayerPasswordMessage,
  ): Promise<PlayerDto> {
    const persisted = await this.storage.find(id);
    throwIfTrue(!persisted, new NotFoundException('PLAYER_NOT_FOUND'));
    PlayerService.checkPassword(persisted, changePasswordMessage.oldPassword);

    persisted.password = changePasswordMessage.newPassword;
    return await this.storage.update(persisted);
  }
}
