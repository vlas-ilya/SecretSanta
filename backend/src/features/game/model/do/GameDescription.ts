import { GAME_DESCRIPTION_MAX_LENGTH, GAME_DESCRIPTION_MIN_LENGTH } from 'model';
import { inInterval, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { Interval } from '../../../../utils/classes/Interval';

export class GameDescription {
  constructor(private _value: string) {
    notNull(_value, new BadRequestException('GAME_DESCRIPTION_IS_NULL'));
    inInterval(
      _value,
      new Interval(GAME_DESCRIPTION_MIN_LENGTH, GAME_DESCRIPTION_MAX_LENGTH),
      new BadRequestException('GAME_DESCRIPTION_HAS_INCORRECT_LENGTH'),
    );
  }

  get value(): string {
    return this._value;
  }
}
