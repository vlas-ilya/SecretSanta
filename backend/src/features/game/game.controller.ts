import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import Game, { GameId, GamePassword } from './game.entity';

import { GameService } from './game.service';
import { PlayerId } from '../player/player.entity';

@Controller('/api/game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  async create(@Body('password') password: GamePassword): Promise<Game> {
    return this.service.create(password);
  }

  @Get('/:id')
  async get(
    @Param('id') id: GameId,
    @Headers('password') password: GamePassword,
  ): Promise<Game> {
    return await this.service.get(id, password);
  }

  @Get('/:id/start')
  async start(
    @Param('id') id: GameId,
    @Headers('password') password: GamePassword,
  ): Promise<void> {
    await this.service.start(id, password);
  }

  @Put('/:id')
  async update(
    @Param('id') id: PlayerId,
    @Body() game: Game,
    @Headers('password') password: GamePassword,
  ): Promise<Game> {
    return await this.service.update({ ...game, id: id }, password);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: PlayerId,
    @Headers('password') password: GamePassword,
  ): Promise<void> {
    await this.service.delete(id, password);
  }
}
