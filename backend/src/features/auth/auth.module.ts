import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GameModule } from '../game/game.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from '../password/password.module';
import { PlayerModule } from '../player/player.module';
import { jwtConstants } from './auth.constants';

@Module({
  imports: [
    GameModule,
    PlayerModule,
    PassportModule,
    PasswordModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
