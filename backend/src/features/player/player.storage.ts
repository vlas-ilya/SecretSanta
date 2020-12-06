import Player, { PlayerId, PlayerPassword } from './player.entity';

import { GameStorage } from '../game/game.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RegistrationId } from '../game/game.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class PlayerStorage {
  constructor(
    @InjectRepository(Player) private repository: Repository<Player>,
    private readonly gameStorage: GameStorage,
  ) {}

  async create(
    registrationId: RegistrationId,
    password: PlayerPassword,
  ): Promise<Player> {
    const game = await this.gameStorage.findByRegistrationId(registrationId);
    const player = new Player();
    player.id = v4();
    player.game = game;
    player.password = password;
    return await this.repository.save(player);
  }

  async find(id: PlayerId): Promise<Player | undefined> {
    return await this.repository.findOne(id);
  }

  async update(player: Player): Promise<Player> {
    const persisted = await this.find(player.id);

    persisted.playerState = player.playerState;
    persisted.name = player.name;
    persisted.wish = player.wish;
    persisted.taboo = player.taboo;
    persisted.targetId = player.targetId;

    return this.repository.save(persisted);
  }

  async delete(player: Player): Promise<void> {
    await this.repository.delete(player);
  }
}
