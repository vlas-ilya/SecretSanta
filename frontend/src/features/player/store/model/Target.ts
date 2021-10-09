import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
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
  @Length(5, 255) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  @IsOptional()
  name?: PlayerName;

  @IsString()
  @Length(0, 1000) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  @IsOptional()
  wish?: PlayerWish;

  @IsString()
  @Length(0, 1000) // TODO (fix): Вынести константы в глобальные параметры для обоих проектов
  @IsOptional()
  taboo?: PlayerTaboo;
}
