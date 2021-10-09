import {
  GameDescription,
  GameId,
  GameState,
  GameTitle,
} from '../../../game/store/model/GameTypes';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class GameShortInfo {
  constructor(
    id: GameId,
    state: GameState,
    title: GameTitle,
    description: GameDescription,
  ) {
    this.id = id;
    this.state = state;
    this.title = title;
    this.description = description;
  }

  @IsString()
  @IsNotEmpty()
  id: GameId;

  @IsEnum(GameState)
  @IsNotEmpty()
  state: GameState = GameState.INIT;

  @IsString()
  @Length(10, 255) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  @IsOptional()
  title?: GameTitle;

  @IsString()
  @Length(10, 1000) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  @IsOptional()
  description?: GameDescription;
}
