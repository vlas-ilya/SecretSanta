import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameStorage } from './game.storage';
import { Module } from '@nestjs/common';
import { PlayerStorage } from '../player/player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameEntity from '../../model/GameEntity';
import PlayerEntity from '../../model/PlayerEntity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [GameController],
  providers: [GameService, GameStorage, PlayerStorage],
})
export class GameModule {}
