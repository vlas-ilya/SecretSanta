import {
  GAME_PIN_HAS_INCORRECT_FORMAT,
  GAME_PIN_HAS_INCORRECT_LENGTH,
  GAME_PIN_IS_NULL,
  containsOnlyNumbers,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { GamePin as GamePinVo } from 'model';
import { Interval } from '../../../../utils/classes/Interval';
import { GAME_CHANGE_PIN_MAX_LENGTH, GAME_CHANGE_PIN_MIN_LENGTH } from 'model';

export class GamePin {
  private readonly _value;

  constructor(pin: GamePinVo) {
    notNull(pin, GAME_PIN_IS_NULL);
    containsOnlyNumbers(pin, GAME_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH),
      GAME_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}
