import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  PLAYER_NAME_ERROR_MESSAGE,
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
  PLAYER_TABOO_ERROR_MESSAGE,
  PLAYER_TABOO_MAX_LENGTH,
  PLAYER_TABOO_MIN_LENGTH,
  PLAYER_WISH_ERROR_MESSAGE,
  PLAYER_WISH_MAX_LENGTH,
  PLAYER_WISH_MIN_LENGTH,
} from './constants';
import {
  PlayerId,
  PlayerName,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from './PlayerTypes';

import { GameShortInfo } from './GameShortInfo';
import { PlayerChanges } from './PlayerChange';
import { Target } from './Target';

export class Player {
  constructor(
    id: PlayerId,
    state: PlayerState,
    hasPassword: boolean,
    name: PlayerName,
    wish: PlayerWish,
    taboo: PlayerTaboo,
    target: Target,
    game: GameShortInfo,
  ) {
    this.id = id;
    this.state = state;
    this.hasPassword = hasPassword;
    this.name = name;
    this.wish = wish;
    this.taboo = taboo;
    this.target = target;
    this.game = game;
  }

  @IsString()
  @IsNotEmpty()
  id: PlayerId = '';

  @IsEnum(PlayerState)
  @IsNotEmpty()
  state: PlayerState = PlayerState.INIT;

  @IsBoolean()
  @IsNotEmpty()
  hasPassword: boolean = false;

  @IsString()
  @Length(PLAYER_NAME_MIN_LENGTH, PLAYER_NAME_MAX_LENGTH, {
    message: PLAYER_NAME_ERROR_MESSAGE,
  })
  @IsOptional()
  name?: PlayerName;

  @IsString()
  @Length(PLAYER_WISH_MIN_LENGTH, PLAYER_WISH_MAX_LENGTH, {
    message: PLAYER_WISH_ERROR_MESSAGE,
  })
  @IsOptional()
  wish?: PlayerWish;

  @IsString()
  @Length(PLAYER_TABOO_MIN_LENGTH, PLAYER_TABOO_MAX_LENGTH, {
    message: PLAYER_TABOO_ERROR_MESSAGE,
  })
  @IsOptional()
  taboo?: PlayerTaboo;

  @ValidateNested()
  @IsOptional()
  target?: Target;

  @ValidateNested()
  game: GameShortInfo;

  applyChanges(changes: PlayerChanges) {
    if ('name' in changes) {
      this.name = changes.name.value;
    }
    if ('wish' in changes) {
      this.wish = changes.wish.value;
    }
    if ('taboo' in changes) {
      this.taboo = changes.taboo.value;
    }
    if ('state' in changes) {
      this.state = changes.state.value;
    }
  }
}
