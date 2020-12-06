import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameStorage } from './game.storage';
import { Module } from '@nestjs/common';
import { PlayerStorage } from '../player/player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameDto from '../../model/GameDto';
import PlayerDto from '../../model/PlayerDto';

@Module({
  imports: [TypeOrmModule.forFeature([GameDto]), TypeOrmModule.forFeature([PlayerDto])],
  controllers: [GameController],
  providers: [GameService, GameStorage, PlayerStorage],
})
export class GameModule {}
