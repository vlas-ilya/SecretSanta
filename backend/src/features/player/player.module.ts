import { GameStorage } from '../game/game.storage';
import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerStorage } from './player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameDto from '../../model/GameDto';
import PlayerDto from '../../model/PlayerDto';

@Module({
  imports: [TypeOrmModule.forFeature([GameDto]), TypeOrmModule.forFeature([PlayerDto])],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerStorage, GameStorage],
})
export class PlayerModule {}
