import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import PlayerEntity, { PlayerId } from './player.entity';

import { PlayerService } from './player.service';
import { RegistrationId } from '../game/game.entity';

@Controller('player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post('/register/:id')
  async register(@Param('id') id: RegistrationId): Promise<PlayerId> {
    return await this.service.create(id);
  }

  @Get(':id')
  async get(@Param('id') id: PlayerId): Promise<PlayerEntity> {
    return await this.service.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: PlayerId,
    @Body() player: PlayerEntity,
  ): Promise<PlayerEntity> {
    return await this.service.update({ ...player, id: id });
  }
}
