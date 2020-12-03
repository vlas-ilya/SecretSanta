import { Module } from '@nestjs/common';
import { GameModule } from './features/game/game.module';
import { PlayerModule } from './features/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GameModule,
    PlayerModule
  ],
})
export class AppModule {}
