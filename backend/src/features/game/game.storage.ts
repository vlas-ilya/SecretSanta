import { Game } from './model/do/Game';
import { GameDto } from './model/dto/GameDto';
import { GameId } from './model/do/GameId';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RegistrationId } from './model/do/RegistrationId';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { GameState } from './model/do/GameState';

@Injectable()
export class GameStorage {
  constructor(@InjectRepository(GameDto) private repository: Repository<GameDto>) {}

  async create(): Promise<Game> {
    const game = new GameDto();
    game.id = v4();
    game.registrationId = v4();
    game.state = GameState.INIT;
    const persisted = await this.repository.save(game);
    return Game.fromDto(persisted);
  }

  async find(id: GameId): Promise<Game | undefined> {
    const persisted: GameDto = await this.repository.findOne({
      where: { id: id.value },
      relations: ['players'],
    });
    if (!persisted) {
      return null;
    }
    return Game.fromDto(persisted);
  }

  async findByRegistrationId(registrationId: RegistrationId): Promise<Game | undefined> {
    const persisted: GameDto = await this.repository.findOne({
      registrationId: registrationId.value,
    });
    if (!persisted) {
      return null;
    }
    return Game.fromDto(persisted);
  }

  async delete(game: Game): Promise<void> {
    await this.repository.delete(game.toDto());
  }

  async update(game: Game): Promise<Game> {
    const persisted: GameDto = await this.repository.save(game.toDto());
    return Game.fromDto(persisted);
  }
}
