import { PLAYER_TABOO_MAX_LENGTH, PLAYER_TABOO_MIN_LENGTH } from 'model';
import { inInterval, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { Interval } from '../../../../utils/classes/Interval';

export class PlayerTaboo {
  constructor(private _value: string) {
    notNull(_value, new BadRequestException('PLAYER_TABOO_IS_NULL'));
    inInterval(
      _value,
      new Interval(PLAYER_TABOO_MIN_LENGTH, PLAYER_TABOO_MAX_LENGTH),
      new BadRequestException('PLAYER_TABOO_HAS_INCORRECT_LENGTH'),
    );
  }

  get value(): string {
    return this._value;
  }
}
