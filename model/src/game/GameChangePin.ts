import {
  GAME_CHANGE_PIN_ERROR_MESSAGE,
  GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  GAME_CHANGE_PIN_MAX_LENGTH,
  GAME_CHANGE_PIN_MIN_LENGTH,
} from './constants';
import { IsDecimal, IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';

import { GamePin } from './GameTypes';
import { Match } from '../utils/matchDecorator';

export class GameChangePin {
  constructor(
    newPin: GamePin,
    confirmation: GamePin,
    oldPin?: GamePin,
    hasPassword?: boolean,
  ) {
    if (oldPin && oldPin.length > 0) {
      this.oldPin = oldPin;
    }
    this.newPin = newPin;
    this.confirmation = confirmation;
    this.hasPassword = hasPassword;
  }

  static build(
    newPin: GamePin,
    confirmation: GamePin,
    oldPin?: GamePin,
    hasPassword?: boolean,
  ): GameChangePin {
    return new GameChangePin(newPin, confirmation, oldPin, hasPassword);
  }

  @ValidateIf((o: GameChangePin) => !!o.hasPassword || !!o.oldPin)
  @IsNotEmpty()
  @IsDecimal()
  @Length(GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH, {
    message: GAME_CHANGE_PIN_ERROR_MESSAGE,
  })
  oldPin?: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH, {
    message: GAME_CHANGE_PIN_ERROR_MESSAGE,
  })
  newPin: GamePin;

  @IsNotEmpty()
  @IsDecimal()
  @Match('newPin', {
    message: GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  })
  @Length(GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH, {
    message: GAME_CHANGE_PIN_ERROR_MESSAGE,
  })
  confirmation: GamePin;

  @IsOptional()
  hasPassword?: boolean;
}
