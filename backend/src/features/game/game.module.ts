import { GameController } from './game.controller';
import { GameDto } from './model/dto/GameDto';
import { GameService } from './game.service';
import { GameStorage } from './game.storage';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GameDto])],
  controllers: [GameController],
  providers: [GameService, GameStorage],
  exports: [GameStorage],
})
export class GameModule {}
