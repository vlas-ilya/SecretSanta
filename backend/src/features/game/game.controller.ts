import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { GameId, GamePassword } from '../../model/GameTypes';

import { GameService } from './game.service';
import { PlayerId } from '../../model/PlayerTypes';
import GameDto from '../../model/GameDto';
import { ChangeGamePasswordMessage } from '../../model/ChangeGamePasswordMessage';

@Controller('/api/game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  async create(): Promise<GameDto> {
    return this.service.create();
  }

  @Put('/:id')
  async changePassword(
    @Param('id') id: GameId,
    @Body('password') changePasswordMessage: ChangeGamePasswordMessage,
  ): Promise<GameDto> {
    return this.service.changePassword(id, changePasswordMessage);
  }

  @Get('/:id')
  async get(@Param('id') id: GameId, @Headers('password') password: GamePassword): Promise<GameDto> {
    return await this.service.get(id, password);
  }

  @Get('/:id/start')
  async start(@Param('id') id: GameId, @Headers('password') password: GamePassword): Promise<void> {
    await this.service.start(id, password);
  }

  @Put('/:id')
  async update(
    @Param('id') id: PlayerId,
    @Body() game: GameDto,
    @Headers('password') password: GamePassword,
  ): Promise<GameDto> {
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
