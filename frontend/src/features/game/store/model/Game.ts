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
  @Length(10, 255, {
    message: 'Заголовок должен занимать от 10 до 255 символов',
  })
  @IsOptional()
  title?: GameTitle;

  @IsString()
  @Length(10, 1000, {
    message: 'Описание должно занимать от 10 до 255 символов',
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
