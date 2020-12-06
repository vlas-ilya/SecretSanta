import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PlayerEntity, { PlayerId, PlayerPassword } from './player.entity';

import { PlayerService } from './player.service';
import { RegistrationId } from '../game/game.entity';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Post('/register/:id')
  async register(
    @Param('id') id: RegistrationId,
    @Body('password') password: PlayerPassword,
  ): Promise<PlayerId> {
    return await this.service.create(id, password);
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
