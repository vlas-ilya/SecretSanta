import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import {
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
  PLAYER_TABOO_MAX_LENGTH,
  PLAYER_TABOO_MIN_LENGTH,
  PLAYER_WISH_MAX_LENGTH,
  PLAYER_WISH_MIN_LENGTH,
} from './constants';
import { PlayerName, PlayerState, PlayerTaboo, PlayerWish } from './PlayerTypes';

export class Target {
  constructor(
    state: PlayerState,
    name: PlayerName,
    wish: PlayerWish,
    taboo: PlayerTaboo,
  ) {
    this.state = state;
    this.name = name;
    this.wish = wish;
    this.taboo = taboo;
  }

  @IsEnum(PlayerState)
  @IsNotEmpty()
  state: PlayerState;

  @IsString()
  @Length(PLAYER_NAME_MIN_LENGTH, PLAYER_NAME_MAX_LENGTH)
  @IsOptional()
  name?: PlayerName;

  @IsString()
  @Length(PLAYER_WISH_MIN_LENGTH, PLAYER_WISH_MAX_LENGTH)
  @IsOptional()
  wish?: PlayerWish;

  @IsString()
  @Length(PLAYER_TABOO_MIN_LENGTH, PLAYER_TABOO_MAX_LENGTH)
  @IsOptional()
  taboo?: PlayerTaboo;
}
