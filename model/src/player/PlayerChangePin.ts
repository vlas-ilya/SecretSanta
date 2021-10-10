import { IsDecimal, IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';
import {
  PLAYER_CHANGE_PIN_ERROR_MESSAGE,
  PLAYER_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  PLAYER_CHANGE_PIN_MAX_LENGTH,
  PLAYER_CHANGE_PIN_MIN_LENGTH,
} from './constants';

import { Match } from '../utils/matchDecorator';
import { PlayerPin } from './PlayerTypes';

export class PlayerChangePin {
  constructor(
    newPin: PlayerPin,
    confirmation: PlayerPin,
    oldPin?: PlayerPin,
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
    newPin: PlayerPin,
    confirmation: PlayerPin,
    oldPin?: PlayerPin,
    hasPassword?: boolean,
  ): PlayerChangePin {
    return new PlayerChangePin(newPin, confirmation, oldPin, hasPassword);
  }

  @ValidateIf((o: PlayerChangePin) => !!o.hasPassword || !!o.oldPin)
  @IsNotEmpty()
  @IsDecimal()
  @Length(PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH, {
    message: PLAYER_CHANGE_PIN_ERROR_MESSAGE,
  })
  oldPin?: PlayerPin;

  @IsNotEmpty()
  @IsDecimal()
  @Length(PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH, {
    message: PLAYER_CHANGE_PIN_ERROR_MESSAGE,
  })
  newPin: PlayerPin;

  @IsNotEmpty()
  @IsDecimal()
  @Match('newPin', {
    message: PLAYER_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  })
  @Length(PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH, {
    message: PLAYER_CHANGE_PIN_ERROR_MESSAGE,
  })
  confirmation: PlayerPin;

  @IsOptional()
  hasPassword?: boolean;
}
