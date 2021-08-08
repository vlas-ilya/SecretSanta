import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PlayerChangesVo, PlayerIdVo, PlayerVo } from './model/vo/PlayerVo';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlayerChanges } from './model/do/PlayerChanges';
import { PlayerId } from './model/do/PlayerId';
import { PlayerService } from './player.service';
import { RegistrationId } from '../game/model/do/RegistrationId';
import { RegistrationIdVo } from '../game/model/vo/GameVo';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  @Get('/register/:id')
  @HttpCode(HttpStatus.FOUND)
  async register(
    @Res() res,
    @Param('id') registrationId: RegistrationIdVo,
  ): Promise<PlayerIdVo> {
    const playerId = await this.service.create(new RegistrationId(registrationId));
    return res.redirect(`/player/${playerId.value}`);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: PlayerIdVo): Promise<PlayerVo> {
    const player = await this.service.get(new PlayerId(id));
    return player.toVo();
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: PlayerIdVo,
    @Body() request: PlayerChangesVo,
  ): Promise<PlayerVo> {
    const player = await this.service.update(
      new PlayerId(id),
      new PlayerChanges(request),
    );
    return player.toVo();
  }
}
