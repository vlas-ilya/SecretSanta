import {
  GAME_CHANGE_PIN_ERROR_MESSAGE,
  GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  GAME_CHANGE_PIN_MAX_LENGTH,
  GAME_CHANGE_PIN_MIN_LENGTH,
} from './constants';
import { IsDecimal, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { GamePin } from './GameTypes';
import { Match } from '../utils/matchDecorator';

export class GameChangePin {
  constructor(newPin: GamePin, confirmation: GamePin, oldPin?: GamePin) {
    if (oldPin && oldPin.length > 0) {
      this.oldPin = oldPin;
    }
    this.newPin = newPin;
    this.confirmation = confirmation;
  }

  static build(newPin: GamePin, confirmation: GamePin, oldPin?: GamePin): GameChangePin {
    return new GameChangePin(newPin, confirmation, oldPin);
  }

  @IsOptional()
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
}
