import { GAME_NOT_FOUND, notNull } from '../../utils/validators';

import { Game } from './model/do/Game';
import { GameChanges } from './model/do/GameChanges';
import { GameId } from './model/do/GameId';
import { GameState } from './model/do/GameState';
import { GameStorage } from './game.storage';
import { Injectable } from '@nestjs/common';
import { Player } from '../player/model/do/Player';
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
    const [newVersion, gameWasStarted] = await changes.apply(game);
    if (gameWasStarted) {
      await this.removeNotActivePlayers(newVersion.players);
      newVersion.calculateTargets();
      await this.savePlayers(newVersion.players);
    }
    await this.storage.update(newVersion);
    return await this.get(id);
  }

  private async removeNotActivePlayers(players: Player[]) {
    await Promise.all(
      players
        .filter((player) => player.state !== PlayerState.ACTIVE)
        .map((player) => this.playerStorage.delete(player)),
    );
  }

  private async savePlayers(players: Player[]) {
    await Promise.all(players.map((player) => this.playerStorage.update(player)));
  }

  async delete(id: GameId): Promise<void> {
    const game = await this.get(id);
    await Promise.all(game.players.map((player) => this.playerStorage.delete(player)));
    await this.storage.delete(game);
  }
}
