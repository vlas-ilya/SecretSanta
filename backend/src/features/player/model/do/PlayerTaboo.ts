import {
  PLAYER_TABOO_HAS_INCORRECT_LENGTH,
  PLAYER_TABOO_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { Interval } from '../../../../utils/classes/Interval';

export const PLAYER_TABOO_MIN_LENGTH = 0;
export const PLAYER_TABOO_MAX_LENGTH = 1000;

export class PlayerTaboo {
  constructor(private _value: string) {
    notNull(_value, PLAYER_TABOO_IS_NULL);
    inInterval(
      _value,
      new Interval(PLAYER_TABOO_MIN_LENGTH, PLAYER_TABOO_MAX_LENGTH),
      PLAYER_TABOO_HAS_INCORRECT_LENGTH,
    );
  }

  get value(): string {
    return this._value;
  }
}
