import { GameId, RegistrationId } from '../../model/GameTypes';

import GameEntity from '../../model/GameEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PlayerId } from '../../model/PlayerTypes';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class GameStorage {
  constructor(@InjectRepository(GameEntity) private repository: Repository<GameEntity>) {}

  async create(): Promise<GameEntity> {
    const game = new GameEntity();
    game.id = v4();
    game.registrationId = v4();
    return this.repository.save(game);
  }

  async find(id: GameId): Promise<GameEntity | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async findByRegistrationId(registrationId: RegistrationId): Promise<GameEntity | undefined> {
    return await this.repository.findOne({
      registrationId,
    });
  }

  async findByPlayerId(playerId: PlayerId): Promise<GameEntity> {
    return await this.repository
      .createQueryBuilder('game')
      .innerJoin('game.players', 'player')
      .where('player.id = :playerId', { playerId })
      .getOne();
  }

  async delete(game: GameEntity): Promise<void> {
    await this.repository.delete(game);
  }

  async update(persisted: GameEntity): Promise<GameEntity> {
    return this.repository.save(persisted);
  }
}
