import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { GameId, GamePassword } from '../../model/GameTypes';

import { ChangeGamePasswordMessage } from '../../model/ChangeGamePasswordMessage';
import GameDto from '../../model/GameDto';
import { GameService } from './game.service';
import { PlayerId } from '../../model/PlayerTypes';

@Controller('/api/game')
export class GameController {
  // TODO: добавить регистрацию админа икры как игрока

  constructor(private readonly service: GameService) {}

  @Post()
  async create(): Promise<GameId> {
    return this.service.create();
  }

  @Put('/:id/changePassword')
  async changePassword(
    @Param('id') id: GameId,
    @Body('password') changePasswordMessage: ChangeGamePasswordMessage,
  ): Promise<GameDto> {
    return this.service.changePassword(id, changePasswordMessage);
  }

  @Get('/:id')
  async get(
    @Param('id') id: GameId,
    @Headers('password') password: GamePassword,
  ): Promise<GameDto> {
    // TODO: возвращать только активных игроков
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
