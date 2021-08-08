import {
  PLAYER_NAME_HAS_INCORRECT_LENGTH,
  PLAYER_NAME_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { Interval } from '../../../../utils/classes/Interval';

export const PLAYER_NAME_MIN_LENGTH = 5;
export const PLAYER_NAME_MAX_LENGTH = 255;

export class PlayerName {
  constructor(private _value: string) {
    notNull(_value, PLAYER_NAME_IS_NULL);
    inInterval(
      _value,
      new Interval(PLAYER_NAME_MIN_LENGTH, PLAYER_NAME_MAX_LENGTH),
      PLAYER_NAME_HAS_INCORRECT_LENGTH,
    );
  }

  get value(): string {
    return this._value;
  }
}
