import {
  GAME_DESCRIPTION_HAS_INCORRECT_LENGTH,
  GAME_DESCRIPTION_IS_NULL,
  inInterval,
  notNull,
} from '../../../../utils/validators';

import { Interval } from '../../../../utils/classes/Interval';

// TODO: Move to model project
export const GAME_DESCRIPTION_MIN_LENGTH = 10;
export const GAME_DESCRIPTION_MAX_LENGTH = 1000;

export class GameDescription {
  constructor(private _value: string) {
    notNull(_value, GAME_DESCRIPTION_IS_NULL);
    inInterval(
      _value,
      new Interval(GAME_DESCRIPTION_MIN_LENGTH, GAME_DESCRIPTION_MAX_LENGTH),
      GAME_DESCRIPTION_HAS_INCORRECT_LENGTH,
    );
  }

  get value(): string {
    return this._value;
  }
}
