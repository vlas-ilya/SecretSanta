import { IsDecimal, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { PlayerPin } from './PlayerTypes';

export class PlayerChangePin {
  constructor(oldValue: PlayerPin, newValue: PlayerPin) {
    this.oldValue = oldValue;
    this.newValue = newValue;
  }

  @IsDecimal()
  @Length(4, 8)
  @IsOptional()
  oldValue?: PlayerPin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8)
  newValue: PlayerPin;
}
