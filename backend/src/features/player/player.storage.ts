import { GameStorage } from '../game/game.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import PlayerEntity from '../../model/PlayerEntity';
import { PlayerId } from '../../model/PlayerTypes';
import { RegistrationId } from '../../model/GameTypes';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class PlayerStorage {
  constructor(
    @InjectRepository(PlayerEntity) private repository: Repository<PlayerEntity>,
    private readonly gameStorage: GameStorage,
  ) {}

  async create(registrationId: RegistrationId): Promise<PlayerEntity> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    const player = new PlayerEntity();
    player.id = v4();
    player.game = game;
    return await this.repository.save(player);
  }

  async find(id: PlayerId): Promise<PlayerEntity | undefined> {
    return await this.repository.findOne(id);
  }

  async update(player: PlayerEntity): Promise<PlayerEntity> {
    return this.repository.save(player);
  }

  async delete(player: PlayerEntity): Promise<void> {
    await this.repository.delete(player);
  }
}
