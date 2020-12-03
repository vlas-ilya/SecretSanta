import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameStorage } from './game.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import Game from './game.entity';
import { PlayerStorage } from '../player/player.storage';
import Player from '../player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Player])
  ],
  controllers: [GameController],
  providers: [GameService, GameStorage, PlayerStorage],
})
export class GameModule {}
