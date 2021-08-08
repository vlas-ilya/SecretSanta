import {
  GAME_PASSWORD_IS_NOT_CORRECT,
  GAME_PASSWORD_IS_NULL,
  GAME_PIN_HAS_INCORRECT_FORMAT,
  GAME_PIN_HAS_INCORRECT_LENGTH,
  GAME_PIN_IS_NULL,
  containsOnlyNumbers,
  correctHash,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { GamePinVo } from '../vo/GameVo';
import { Interval } from '../../../../utils/classes/Interval';

export const GAME_PIN_MIN_LENGTH = 4;
export const GAME_PIN_MAX_LENGTH = 8;

export type InitValue =
  | {
      pin: GamePinVo;
    }
  | {
      password: string;
    };

export class GamePassword {
  private readonly _value;

  constructor(value: InitValue) {
    if ('password' in value) {
      const password = value.password;
      notNull(password, GAME_PASSWORD_IS_NULL);
      correctHash(password, GAME_PASSWORD_IS_NOT_CORRECT);
      this._value = password;
      return;
    }

    const pin = value.pin;
    notNull(pin, GAME_PIN_IS_NULL);
    containsOnlyNumbers(pin, GAME_PIN_HAS_INCORRECT_FORMAT);
    inInterval(
      pin,
      new Interval(GAME_PIN_MIN_LENGTH, GAME_PIN_MAX_LENGTH),
      GAME_PIN_HAS_INCORRECT_LENGTH,
    );
    this._value = pin; // TODO: add salt and hash
  }

  get value(): string {
    return this._value;
  }

  static createOrNull(value?: InitValue): GamePassword {
    return ('password' in value && value.password) || ('pin' in value && value.pin)
      ? new GamePassword(value)
      : null;
  }
}
