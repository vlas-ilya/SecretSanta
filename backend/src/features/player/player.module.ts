import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerStorage } from './player.storage';
import { GameStorage } from '../game/game.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import Player from './player.entity';
import Game from '../game/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Player])
  ],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerStorage, GameStorage],
})
export class PlayerModule {}
