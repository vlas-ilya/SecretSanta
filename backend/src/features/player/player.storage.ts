import { GameStorage } from '../game/game.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import PlayerDto from '../../model/PlayerDto';
import { PlayerId } from '../../model/PlayerTypes';
import { RegistrationId } from '../../model/GameTypes';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class PlayerStorage {
  constructor(
    @InjectRepository(PlayerDto) private repository: Repository<PlayerDto>,
    private readonly gameStorage: GameStorage,
  ) {}

  async create(registrationId: RegistrationId): Promise<PlayerDto> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    const player = new PlayerDto();
    player.id = v4();
    player.game = game;
    return await this.repository.save(player);
  }

  async find(id: PlayerId): Promise<PlayerDto | undefined> {
    return await this.repository.findOne(id);
  }

  async update(player: PlayerDto): Promise<PlayerDto> {
    return this.repository.save(player);
  }

  async delete(player: PlayerDto): Promise<void> {
    await this.repository.delete(player);
  }
}
