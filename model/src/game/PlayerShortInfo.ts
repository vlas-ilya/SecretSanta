import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { PLAYER_NAME_MAX_LENGTH, PLAYER_NAME_MIN_LENGTH } from '../player/constants';
import { PlayerName, PlayerState } from '../player/PlayerTypes';

export class PlayerShortInfo {
  constructor(state: PlayerState, name?: PlayerName) {
    this.state = state;
    this.name = name;
  }

  @IsEnum(PlayerState)
  @IsNotEmpty()
  state: PlayerState;

  @IsString()
  @Length(PLAYER_NAME_MIN_LENGTH, PLAYER_NAME_MAX_LENGTH)
  @IsOptional()
  name?: PlayerName;
}
