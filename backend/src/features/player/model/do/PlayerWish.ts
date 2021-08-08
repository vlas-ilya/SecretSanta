import {
  PLAYER_WISH_HAS_INCORRECT_LENGTH,
  PLAYER_WISH_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { Interval } from '../../../../utils/classes/Interval';

export const PLAYER_WISH_MIN_LENGTH = 0;
export const PLAYER_WISH_MAX_LENGTH = 1000;

export class PlayerWish {
  constructor(private _value: string) {
    notNull(_value, PLAYER_WISH_IS_NULL);
    inInterval(
      _value,
      new Interval(PLAYER_WISH_MIN_LENGTH, PLAYER_WISH_MAX_LENGTH),
      PLAYER_WISH_HAS_INCORRECT_LENGTH,
    );
  }

  get value(): string {
    return this._value;
  }
}
