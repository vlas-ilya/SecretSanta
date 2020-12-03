import { Injectable } from '@nestjs/common';
import Game, { RegistrationId } from './game.entity';
import { PlayerId } from '../player/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class GameStorage {
  constructor(@InjectRepository(Game) private repository: Repository<Game>) {}

  async create(): Promise<Game> {
    const game = new Game();
    game.id = v4();
    game.registrationId = v4();
    return this.repository.save(game);
  }

  async find(id: PlayerId): Promise<Game | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async findByRegistrationId(registrationId: RegistrationId): Promise<Game | undefined> {
    return await this.repository.findOne({
      registrationId
    });
  }

  async findByPlayerId(playerId: PlayerId): Promise<Game> {
    return await this.repository.createQueryBuilder('game')
      .innerJoin('game.players', 'player')
      .where('player.id = :playerId', { playerId })
      .getOne();
  }

  async delete(game: Game): Promise<void> {
    await this.repository.delete(game);
  }

  async update(game: Game): Promise<Game> {
    const persisted = await this.find(game.id)

    persisted.gameState = game.gameState;
    persisted.playerState = game.playerState;
    persisted.name = game.name;
    persisted.wish = game.wish;
    persisted.dontWish = game.dontWish;
    persisted.targetId = game.targetId;

    return this.repository.save(persisted);
  }
}
