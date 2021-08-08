import {
  GAME_PIN_HAS_INCORRECT_FORMAT,
  GAME_PIN_HAS_INCORRECT_LENGTH,
  GAME_PIN_IS_NULL,
  containsOnlyNumbers,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { GamePinVo } from '../vo/GameVo';
import { Interval } from '../../../../utils/classes/Interval';

export const GAME_PIN_MIN_LENGTH = 4;
export const GAME_PIN_MAX_LENGTH = 8;

export class GamePin {
  private readonly _value;

  constructor(pin: GamePinVo) {
    notNull(pin, GAME_PIN_IS_NULL);
    containsOnlyNumbers(pin, GAME_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(GAME_PIN_MIN_LENGTH, GAME_PIN_MAX_LENGTH),
      GAME_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}
