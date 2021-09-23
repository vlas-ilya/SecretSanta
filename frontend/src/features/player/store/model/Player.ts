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
  @Length(5, 255)
  @IsOptional()
  name?: PlayerName;

  @IsString()
  @Length(0, 1000)
  @IsOptional()
  wish?: PlayerWish;

  @IsString()
  @Length(0, 1000)
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
