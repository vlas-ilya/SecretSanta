import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { PlayerName, PlayerState } from '../../../player/store/model/PlayerTypes';

export class PlayerShortInfo {
  constructor(state: PlayerState, name?: PlayerName) {
    this.state = state;
    this.name = name;
  }

  @IsEnum(PlayerState)
  @IsNotEmpty()
  state: PlayerState;

  @IsString()
  @Length(5, 255)
  @IsOptional()
  name?: PlayerName;
}
