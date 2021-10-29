import { Game } from './model/do/Game';
import { GameChanges } from './model/do/GameChanges';
import { GameId } from './model/do/GameId';
import { GameStorage } from './game.storage';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../exceptions/NotFoundException';
import { Player } from '../player/model/do/Player';
import { PlayerState } from '../player/model/do/PlayerState';
import { PlayerStorage } from '../player/player.storage';
import { notNull } from '../../utils/validators';

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
    notNull(game, new NotFoundException('GAME_NOT_FOUND'));
    return game;
  }

  async update(id: GameId, changes: GameChanges): Promise<Game> {
    const game = await this.get(id);
    const [newVersion, gameWasStarted] = await changes.apply(game);
    newVersion.players = await this.removeDeletedPlayers(newVersion.players);
    if (gameWasStarted) {
      newVersion.players = await this.removeNotActivePlayers(newVersion.players);
      newVersion.calculateTargets();
    }
    await this.storage.update(newVersion);
    return await this.get(id);
  }

  private async removeDeletedPlayers(players: Player[]): Promise<Player[]> {
    await Promise.all(
      players
        .filter((player) => player.state === PlayerState.DELETED)
        .map((player) => this.playerStorage.delete(player)),
    );
    return players.filter((player) => player.state !== PlayerState.DELETED);
  }

  private async removeNotActivePlayers(players: Player[]): Promise<Player[]> {
    await Promise.all(
      players
        .filter((player) => player.state !== PlayerState.ACTIVE)
        .map((player) => this.playerStorage.delete(player)),
    );
    return players.filter((player) => player.state === PlayerState.ACTIVE);
  }

  async delete(id: GameId): Promise<void> {
    const game = await this.get(id);
    await Promise.all(game.players.map((player) => this.playerStorage.delete(player)));
    await this.storage.delete(game);
  }
}
