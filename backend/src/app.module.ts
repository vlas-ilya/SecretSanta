import { AuthModule } from './features/auth/auth.module';
import { GameModule } from './features/game/game.module';
import { Module } from '@nestjs/common';
import { PlayerModule } from './features/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
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
