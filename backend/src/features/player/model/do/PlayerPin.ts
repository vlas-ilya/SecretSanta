import { PLAYER_CHANGE_PIN_MAX_LENGTH, PLAYER_CHANGE_PIN_MIN_LENGTH } from 'model';
import { containsOnlyNumbers, inInterval, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { Interval } from '../../../../utils/classes/Interval';
import { PlayerPin as PlayerPinVo } from 'model';

export class PlayerPin {
  private readonly _value;

  constructor(pin: PlayerPinVo) {
    notNull(pin, new BadRequestException('PLAYER_PIN_IS_NULL'));
    containsOnlyNumbers(pin, new BadRequestException('PLAYER_PIN_HAS_INCORRECT_FORMAT'));
    inInterval(
      pin,
      new Interval(PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH),
      new BadRequestException('PLAYER_PIN_HAS_INCORRECT_LENGTH'),
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}
