import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { PlayerId, PlayerPassword } from '../../model/PlayerTypes';

import { ChangePlayerPasswordMessage } from '../../model/ChangePlayerPasswordMessage';
import GameDto from '../../model/GameDto';
import PlayerDto from '../../model/PlayerDto';
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
    @Body('password') changePasswordMessage: ChangePlayerPasswordMessage,
  ): Promise<PlayerDto> {
    return this.service.changePassword(id, changePasswordMessage);
  }

  @Get('/:id/game')
  async getGameInfo(
    @Param('id') id: PlayerId,
    @Headers('password') password: PlayerPassword,
  ): Promise<GameDto> {
    return await this.service.getGameInfo(id, password);
  }

  @Get('/:id')
  async get(
    @Param('id') id: PlayerId,
    @Headers('password') password: PlayerPassword,
  ): Promise<PlayerDto> {
    return await this.service.get(id, password);
  }

  @Put('/:id')
  async update(
    @Param('id') id: PlayerId,
    @Body() player: PlayerDto,
    @Headers('password') password: PlayerPassword,
  ): Promise<PlayerDto> {
    return await this.service.update({ ...player, id: id }, password);
  }
}
