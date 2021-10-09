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
import {
  PlayerChanges as PlayerChangesVo,
  PlayerId as PlayerIdVo,
  Player as PlayerVo,
  RegistrationId as RegistrationIdVo,
} from 'model';

import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlayerChanges } from './model/do/PlayerChanges';
import { PlayerId } from './model/do/PlayerId';
import { PlayerService } from './player.service';
import { RegistrationId } from '../game/model/do/RegistrationId';
import { wrapAllMethodsInTransaction } from '../../utils/transaction';

@Controller('/api/player')
export class PlayerController {
  constructor(private service: PlayerService, private readonly connection: Connection) {
    this.service = wrapAllMethodsInTransaction(connection, service);
  }

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
      await PlayerChanges.create(request),
    );
    return player.toVo();
  }
}
