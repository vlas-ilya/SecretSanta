import { GameId, RegistrationId } from '../../model/GameTypes';

import GameDto from '../../model/GameDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PlayerId } from '../../model/PlayerTypes';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class GameStorage {
  constructor(@InjectRepository(GameDto) private repository: Repository<GameDto>) {}

  async create(): Promise<GameDto> {
    const game = new GameDto();
    game.id = v4();
    game.registrationId = v4();
    return this.repository.save(game);
  }

  async find(id: GameId): Promise<GameDto | undefined> {
    return this.repository.findOne({
      where: { id },
      relations: ['players'],
    });
  }

  async findByRegistrationId(registrationId: RegistrationId): Promise<GameDto | undefined> {
    return await this.repository.findOne({
      registrationId,
    });
  }

  async findByPlayerId(playerId: PlayerId): Promise<GameDto> {
    return await this.repository
      .createQueryBuilder('game')
      .innerJoin('game.players', 'player')
      .where('player.id = :playerId', { playerId })
      .getOne();
  }

  async delete(game: GameDto): Promise<void> {
    await this.repository.delete(game);
  }

  async update(persisted: GameDto): Promise<GameDto> {
    return this.repository.save(persisted);
  }
}
