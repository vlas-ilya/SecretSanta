import { PlayerPin as PlayerPinVo } from 'model';
import {
  containsOnlyNumbers,
  inInterval,
  notNull,
  PLAYER_PIN_HAS_INCORRECT_FORMAT,
  PLAYER_PIN_HAS_INCORRECT_LENGTH,
  PLAYER_PIN_IS_NULL,
} from '../../../../utils/validators';
import { Interval } from '../../../../utils/classes/Interval';
import { PLAYER_CHANGE_PIN_MAX_LENGTH, PLAYER_CHANGE_PIN_MIN_LENGTH } from 'model';

export class PlayerPin {
  private readonly _value;

  constructor(pin: PlayerPinVo) {
    notNull(pin, PLAYER_PIN_IS_NULL);
    containsOnlyNumbers(pin, PLAYER_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH),
      PLAYER_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}
