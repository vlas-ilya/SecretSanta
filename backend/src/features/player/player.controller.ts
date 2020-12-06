import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';

import { PlayerService } from './player.service';
import { RegistrationId } from '../../model/GameTypes';
import { PlayerId, PlayerPassword } from '../../model/PlayerTypes';
import { ChangePlayerPasswordMessage } from '../../model/ChangePlayerPasswordMessage';
import PlayerDto from '../../model/PlayerDto';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post('/register/:id')
  async register(@Param('id') id: RegistrationId): Promise<PlayerId> {
    return await this.service.create(id);
  }

  @Put('/:id')
  async changePassword(
    @Param('id') id: PlayerId,
    @Body('password') changePasswordMessage: ChangePlayerPasswordMessage,
  ): Promise<PlayerDto> {
    return this.service.changePassword(id, changePasswordMessage);
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
