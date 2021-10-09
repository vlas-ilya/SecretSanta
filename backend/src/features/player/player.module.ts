import { Global, Module } from '@nestjs/common';

import { PasswordModule } from '../password/password.module';
import { PlayerController } from './player.controller';
import { PlayerDto } from './model/dto/PlayerDto';
import { PlayerService } from './player.service';
import { PlayerStorage } from './player.storage';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PlayerDto]), PasswordModule],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerStorage],
  exports: [PlayerStorage],
})
export class PlayerModule {}
