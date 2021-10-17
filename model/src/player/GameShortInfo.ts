import {
  GAME_DESCRIPTION_MAX_LENGTH,
  GAME_DESCRIPTION_MIN_LENGTH,
  GAME_TITLE_MAX_LENGTH,
  GAME_TITLE_MIN_LENGTH,
} from '../game/constants';
import { GameDescription, GameState, GameTitle } from '../game/GameTypes';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class GameShortInfo {
  constructor(state: GameState, title: GameTitle, description: GameDescription) {
    this.state = state;
    this.title = title;
    this.description = description;
  }

  @IsEnum(GameState)
  @IsNotEmpty()
  state: GameState = GameState.INIT;

  @IsString()
  @Length(GAME_TITLE_MIN_LENGTH, GAME_TITLE_MAX_LENGTH)
  @IsOptional()
  title?: GameTitle;

  @IsString()
  @Length(GAME_DESCRIPTION_MIN_LENGTH, GAME_DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  description?: GameDescription;
}
