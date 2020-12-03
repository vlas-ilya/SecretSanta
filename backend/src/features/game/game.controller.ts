import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import Game from './game.entity';
import { PlayerId } from '../player/player.entity';

@Controller('game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  async create(): Promise<PlayerId> {
    return this.service.create();
  }

  @Get(':id')
  async get(@Param('id') id: PlayerId): Promise<Game> {
    return await this.service.get(id);
  }

  @Get(':id/start')
  async start(@Param('id') id: PlayerId): Promise<void> {
    await this.service.start(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: PlayerId,
    @Body() game: Game
  ): Promise<Game> {
    return await this.service.update({ ...game, id: id });
  }

  @Delete(':id')
  async delete(@Param('id') id: PlayerId): Promise<void> {
    await this.service.delete(id);
  }
}
