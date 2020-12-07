import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { GameId, GamePassword } from '../../model/GameTypes';

import { ChangeGamePasswordMessage } from '../../model/ChangeGamePasswordMessage';
import GameEntity from '../../model/GameEntity';
import { GameService } from './game.service';
import { PlayerId } from '../../model/PlayerTypes';
import { ResponseFieldSecurity } from '../../interceptors/security.interceptor';

@Controller('/api/game')
@ResponseFieldSecurity()
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
    @Body('message') changePasswordMessage: ChangeGamePasswordMessage,
  ): Promise<GameEntity> {
    return this.service.changePassword(id, changePasswordMessage);
  }

  @Get('/:id')
  @ResponseFieldSecurity('players') // сначала вызывается для метода, а потом для класса
  async get(
    @Param('id') id: GameId,
    @Headers('password') password: GamePassword,
  ): Promise<GameEntity> {
    const game = await this.service.get(id, password);
    game.players = game.players.filter((player) => player.playerState === 'ACTIVE');
    return game;
  }

  @Get('/:id/start')
  async start(@Param('id') id: GameId, @Headers('password') password: GamePassword): Promise<void> {
    await this.service.start(id, password);
  }

  @Put('/:id')
  async update(
    @Param('id') id: PlayerId,
    @Body() game: GameEntity,
    @Headers('password') password: GamePassword,
  ): Promise<GameEntity> {
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
