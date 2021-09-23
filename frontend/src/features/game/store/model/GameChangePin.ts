import { IsDecimal, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { GamePin } from './GameTypes';

export class GameChangePin {
  constructor(newPin: GamePin, confirmation: GamePin, oldPin?: GamePin) {
    this.oldPin = oldPin;
    this.newPin = newPin;
    this.confirmation = confirmation;
  }

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8)
  @IsOptional()
  oldPin?: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8)
  newPin: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(4, 8)
  confirmation: GamePin;
}
