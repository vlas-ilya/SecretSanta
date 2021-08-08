import { PlayerPinVo } from '../vo/PlayerVo';
import {
  containsOnlyNumbers, inInterval,
  notNull,
  PLAYER_PIN_HAS_INCORRECT_FORMAT, PLAYER_PIN_HAS_INCORRECT_LENGTH,
  PLAYER_PIN_IS_NULL,
} from '../../../../utils/validators';
import { Interval } from '../../../../utils/classes/Interval';

export const PLAYER_PIN_MIN_LENGTH = 4;
export const PLAYER_PIN_MAX_LENGTH = 8;

export class PlayerPin {
  private readonly _value;

  constructor(pin: PlayerPinVo) {
    notNull(pin, PLAYER_PIN_IS_NULL);
    containsOnlyNumbers(pin, PLAYER_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(PLAYER_PIN_MIN_LENGTH, PLAYER_PIN_MAX_LENGTH),
      PLAYER_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}