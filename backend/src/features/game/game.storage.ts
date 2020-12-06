import Game, { GameId, GamePassword, RegistrationId } from './game.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PlayerId } from '../player/player.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class GameStorage {
  constructor(@InjectRepository(Game) private repository: Repository<Game>) {}

  async create(password: GamePassword): Promise<Game> {
    const game = new Game();
    game.id = v4();
    game.registrationId = v4();
    game.password = password;
    return this.repository.save(game);
  }

  async find(id: GameId): Promise<Game | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async findByRegistrationId(
    registrationId: RegistrationId,
  ): Promise<Game | undefined> {
    return await this.repository.findOne({
      registrationId,
    });
  }

  async findByPlayerId(playerId: PlayerId): Promise<Game> {
    return await this.repository
      .createQueryBuilder('game')
      .innerJoin('game.players', 'player')
      .where('player.id = :playerId', { playerId })
      .getOne();
  }

  async delete(game: Game): Promise<void> {
    await this.repository.delete(game);
  }

  async update(persisted: Game): Promise<Game> {
    return this.repository.save(persisted);
  }
}
