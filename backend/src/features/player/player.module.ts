import { GameStorage } from '../game/game.storage';
import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerStorage } from './player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameEntity from '../../model/GameEntity';
import PlayerEntity from '../../model/PlayerEntity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerStorage, GameStorage],
})
export class PlayerModule {}
