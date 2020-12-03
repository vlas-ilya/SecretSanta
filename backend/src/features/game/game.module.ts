import Game from './game.entity';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameStorage } from './game.storage';
import { Module } from '@nestjs/common';
import Player from '../player/player.entity';
import { PlayerStorage } from '../player/player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Player]),
  ],
  controllers: [GameController],
  providers: [GameService, GameStorage, PlayerStorage],
})
export class GameModule {}
