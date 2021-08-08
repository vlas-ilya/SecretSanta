import { GAME_NOT_FOUND, notNull } from '../../utils/validators';

import { Game } from './model/do/Game';
import { GameChanges } from './model/do/GameChanges';
import { GameId } from './model/do/GameId';
import { GameState } from './model/do/GameState';
import { GameStorage } from './game.storage';
import { Injectable } from '@nestjs/common';
import { PlayerState } from '../player/model/do/PlayerState';
import { PlayerStorage } from '../player/player.storage';

@Injectable()
export class GameService {
  constructor(
    private readonly storage: GameStorage,
    private readonly playerStorage: PlayerStorage,
  ) {}

  async create(): Promise<GameId> {
    const game = await this.storage.create();
    return game.id;
  }

  async get(id: GameId): Promise<Game> {
    const game = await this.storage.find(id);
    notNull(game, GAME_NOT_FOUND);
    return game;
  }

  async update(id: GameId, changes: GameChanges): Promise<Game> {
    const game = await this.get(id);
    const newGame = changes.apply(game);
    if (game.state === GameState.INIT && newGame.state == GameState.RUN) {
      await Promise.all(
        newGame.players
          .filter((player) => player.state !== PlayerState.ACTIVE)
          .map((player) => this.playerStorage.delete(player)),
      );
      newGame.calculateTargets();
      await Promise.all(
        newGame.players.map((player) => this.playerStorage.update(player)),
      );
    }
    return this.storage.update(newGame);
  }

  async delete(id: GameId): Promise<void> {
    const game = await this.get(id);
    await Promise.all(game.players.map((player) => this.playerStorage.delete(player)));
    await this.storage.delete(game);
  }
}
