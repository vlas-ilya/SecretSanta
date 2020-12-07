import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { PlayerId, PlayerPassword } from '../../model/PlayerTypes';

import { ChangePlayerPasswordMessage } from '../../model/ChangePlayerPasswordMessage';
import GameEntity from '../../model/GameEntity';
import PlayerEntity from '../../model/PlayerEntity';
import { PlayerService } from './player.service';
import { RegistrationId } from '../../model/GameTypes';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post('/register/:id')
  async register(@Param('id') id: RegistrationId): Promise<PlayerId> {
    return await this.service.create(id);
  }

  @Put('/:id/changePassword')
  async changePassword(
    @Param('id') id: PlayerId,
    @Body('message') changePasswordMessage: ChangePlayerPasswordMessage,
  ): Promise<PlayerEntity> {
    return this.service.changePassword(id, changePasswordMessage);
  }

  @Get('/:id/game')
  async getGameInfo(
    @Param('id') id: PlayerId,
    @Headers('password') password: PlayerPassword,
  ): Promise<GameEntity> {
    return await this.service.getGameInfo(id, password);
  }

  @Get('/:id')
  async get(
    @Param('id') id: PlayerId,
    @Headers('password') password: PlayerPassword,
  ): Promise<PlayerEntity> {
    return await this.service.get(id, password);
  }

  @Put('/:id')
  async update(
    @Param('id') id: PlayerId,
    @Body() player: PlayerEntity,
    @Headers('password') password: PlayerPassword,
  ): Promise<PlayerEntity> {
    return await this.service.update({ ...player, id: id }, password);
  }
}
