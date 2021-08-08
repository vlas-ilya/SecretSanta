import {
  GAME_TITLE_HAS_INCORRECT_LENGTH,
  GAME_TITLE_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { Interval } from '../../../../utils/classes/Interval';

export const GAME_TITLE_MIN_LENGTH = 10;
export const GAME_TITLE_MAX_LENGTH = 255;

export class GameTitle {
  constructor(private _value: string) {
    notNull(_value, GAME_TITLE_IS_NULL);
    inInterval(
      _value,
      new Interval(GAME_TITLE_MIN_LENGTH, GAME_TITLE_MAX_LENGTH),
      GAME_TITLE_HAS_INCORRECT_LENGTH,
    );
  }

  get value(): string {
    return this._value;
  }
}
