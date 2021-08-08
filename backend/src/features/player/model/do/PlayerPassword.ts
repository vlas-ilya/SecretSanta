import {
  PLAYER_PASSWORD_HAS_INCORRECT_FORMAT,
  PLAYER_PASSWORD_IS_NULL,
  PLAYER_PIN_HAS_INCORRECT_FORMAT,
  PLAYER_PIN_HAS_INCORRECT_LENGTH,
  PLAYER_PIN_IS_NULL,
  containsOnlyNumbers,
  correctHash,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { InitValue } from '../../../game/model/do/GamePassword';
import { Interval } from '../../../../utils/classes/Interval';

export const PLAYER_PIN_MIN_LENGTH = 4;
export const PLAYER_PIN_MAX_LENGTH = 8;

export class PlayerPassword {
  private readonly _value;

  constructor(value: InitValue) {
    if ('password' in value) {
      const password = value.password;
      notNull(password, PLAYER_PASSWORD_IS_NULL);
      correctHash(password, PLAYER_PASSWORD_HAS_INCORRECT_FORMAT);
      this._value = password;
      return;
    }

    const pin = value.pin;
    notNull(pin, PLAYER_PIN_IS_NULL);
    containsOnlyNumbers(pin, PLAYER_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(PLAYER_PIN_MIN_LENGTH, PLAYER_PIN_MAX_LENGTH),
      PLAYER_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin;
  }

  get value(): string {
    return this._value;
  }

  static createOrNull(value?: InitValue): PlayerPassword {
    return ('password' in value && value.password) || ('pin' in value && value.pin)
      ? new PlayerPassword(value)
      : null;
  }
}
