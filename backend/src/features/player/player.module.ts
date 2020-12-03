import Game from '../game/game.entity';
import { GameStorage } from '../game/game.storage';
import { Module } from '@nestjs/common';
import Player from './player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerStorage } from './player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Player]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerStorage, GameStorage],
})
export class PlayerModule {}
