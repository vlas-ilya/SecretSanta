import {
  GAME_TITLE_HAS_INCORRECT_LENGTH,
  GAME_TITLE_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';
import { GAME_TITLE_MAX_LENGTH, GAME_TITLE_MIN_LENGTH } from 'model';

import { Interval } from '../../../../utils/classes/Interval';

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
