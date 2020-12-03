import Game from './game.entity';
import { GameStorage } from './game.storage';
import { Injectable } from '@nestjs/common';
import InvalidStateException from '../../exceptions/InvalidStateException';
import NotFoundException from '../../exceptions/NotFoundException';
import { PlayerId } from '../player/player.entity';
import { PlayerStorage } from '../player/player.storage';
import { calculateTarget } from '../../utils/calculateTarget';
import { throwIfTrue } from '../../utils/thorwIfTrue';

@Injectable()
export class GameService {
  constructor(
    private readonly storage: GameStorage,
    private readonly playerStorage: PlayerStorage,
  ) {}

  async create(): Promise<PlayerId> {
    const game = await this.storage.create();
    return game.id;
  }

  async get(id: PlayerId): Promise<Game> {
    const game = await this.storage.find(id);
    throwIfTrue(!game, new NotFoundException('GAME_NOT_FOUND'));
    return game;
  }

  async start(id: PlayerId): Promise<void> {
    const persisted = await this.storage.find(id);
    throwIfTrue(!persisted, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(
      persisted.gameState !== 'INIT',
      new InvalidStateException('INVALID_GAME_STATE'),
    );

    const players = [
      ...persisted.players,
      persisted.playerState === 'ACTIVE' && persisted,
    ]
      .filter(Boolean)
      .filter((player) => player.playerState === 'ACTIVE');

    calculateTarget(players);

    for (const player of persisted.players) {
      await this.playerStorage.update(player);
    }

    await this.storage.update({
      ...persisted,
      gameState: 'RUN',
    });
  }

  async update(game: Game): Promise<Game> {
    const persisted = await this.storage.find(game.id);
    throwIfTrue(!persisted, new NotFoundException('GAME_NOT_FOUND'));
    throwIfTrue(
      persisted.gameState !== 'INIT',
      new InvalidStateException('INVALID_GAME_STATE'),
    );

    return this.storage.update({
      ...persisted,
      playerState: game.playerState,
      name: game.name,
      wish: game.wish,
      dontWish: game.dontWish,
    });
  }

  async delete(id: PlayerId): Promise<void> {
    const persisted = await this.storage.find(id);
    throwIfTrue(!persisted, new NotFoundException('GAME_NOT_FOUND'));
    for (const player of persisted.players) {
      await this.playerStorage.delete(player);
    }
    await this.storage.delete(persisted);
  }
}
