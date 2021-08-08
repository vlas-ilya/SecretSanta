import { AuthModule } from './features/auth/auth.module';
import { GameModule } from './features/game/game.module';
import { Module } from '@nestjs/common';
import { PlayerModule } from './features/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    GameModule,
    PlayerModule,
    AuthModule,
  ],
})
export class AppModule {}
