import { Game } from '../game/model/do/Game';
import { GameDto } from '../game/model/dto/GameDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Player } from './model/do/Player';
import { PlayerDto } from './model/dto/PlayerDto';
import { PlayerId } from './model/do/PlayerId';
import { RegistrationId } from '../game/model/do/RegistrationId';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class PlayerStorage {
  constructor(@InjectRepository(PlayerDto) private repository: Repository<PlayerDto>) {}

  async create(registrationId: RegistrationId, game: Game): Promise<Player> {
    const player = new PlayerDto();
    player.id = v4();
    player.game = new GameDto();
    player.game.id = game.id.value;
    const persisted = await this.repository.save(player);
    return Player.fromDto(persisted, game);
  }

  async find(id: PlayerId): Promise<Player | undefined> {
    const persisted = await this.repository.findOne({
      where: { id: id.value },
      relations: ['game', 'target'],
    });
    if (!persisted) {
      return null;
    }
    return Player.fromDto(persisted, Game.fromDto(persisted.game));
  }

  async update(player: Player): Promise<Player> {
    await this.repository.save(player.toDto());
    return this.find(player.id);
  }

  async delete(player: Player): Promise<void> {
    await this.repository.delete(player.toDto());
  }
}
