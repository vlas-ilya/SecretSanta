import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GameModule } from '../game/game.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PlayerModule } from '../player/player.module';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    GameModule,
    PlayerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
