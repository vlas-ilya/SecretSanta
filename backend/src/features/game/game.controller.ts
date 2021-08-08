import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GameChangesVo, GameIdVo, GamePinVo, GameVo } from './model/vo/GameVo';

import { GameChanges } from './model/do/GameChanges';
import { GameId } from './model/do/GameId';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/api/game')
export class GameController {
  constructor(private readonly service: GameService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(): Promise<GameIdVo> {
    const gameId = await this.service.create();
    return gameId.value;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: GameIdVo): Promise<GameVo> {
    const game = await this.service.get(new GameId(id));
    return game.toVo();
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: GameIdVo,
    @Body() request: GameChangesVo,
  ): Promise<GameVo> {
    const game = await this.service.update(new GameId(id), new GameChanges(request));
    return game.toVo();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: GameIdVo): Promise<void> {
    await this.service.delete(new GameId(id));
  }
}
