import {
  GAME_DESCRIPTION_ERROR_MESSAGE,
  GAME_DESCRIPTION_MAX_LENGTH,
  GAME_DESCRIPTION_MIN_LENGTH,
  GAME_TITLE_ERROR_MESSAGE,
  GAME_TITLE_MAX_LENGTH,
  GAME_TITLE_MIN_LENGTH,
} from './constants';
import {
  GameDescription,
  GameId,
  GameState,
  GameTitle,
  RegistrationId,
} from './GameTypes';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { GameChanges } from './GameChange';
import { PlayerShortInfo } from './PlayerShortInfo';

export class Game {
  constructor(
    id: GameId,
    registrationId: RegistrationId,
    state: GameState,
    hasPassword: boolean,
    title?: GameTitle,
    description?: GameDescription,
    players?: PlayerShortInfo[],
  ) {
    this.id = id;
    this.registrationId = registrationId;
    this.state = state;
    this.hasPassword = hasPassword;
    this.title = title;
    this.description = description;
    this.players = players;
  }

  @IsString()
  @IsNotEmpty()
  id: GameId;

  @IsString()
  @IsNotEmpty()
  registrationId: RegistrationId;

  @IsEnum(GameState)
  @IsNotEmpty()
  state: GameState;

  @IsBoolean()
  @IsNotEmpty()
  hasPassword: boolean;

  @IsString()
  @Length(GAME_TITLE_MIN_LENGTH, GAME_TITLE_MAX_LENGTH, {
    message: GAME_TITLE_ERROR_MESSAGE,
  })
  @IsOptional()
  title?: GameTitle;

  @IsString()
  @Length(GAME_DESCRIPTION_MIN_LENGTH, GAME_DESCRIPTION_MAX_LENGTH, {
    message: GAME_DESCRIPTION_ERROR_MESSAGE,
  })
  @IsOptional()
  description?: GameDescription;

  @ValidateNested()
  @IsOptional()
  players?: PlayerShortInfo[];

  applyChanges(changes: GameChanges) {
    if ('title' in changes) {
      this.title = changes.title.value;
    }
    if ('description' in changes) {
      this.description = changes.description.value;
    }
    if ('state' in changes) {
      this.state = changes.state.value;
    }
  }
}
