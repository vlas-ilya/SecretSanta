import { GAME_CHANGE_PIN_MAX_LENGTH, GAME_CHANGE_PIN_MIN_LENGTH } from 'model';

import { containsOnlyNumbers, inInterval, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { GamePin as GamePinVo } from 'model';
import { Interval } from '../../../../utils/classes/Interval';

export class GamePin {
  private readonly _value;

  constructor(pin: GamePinVo) {
    notNull(pin, new BadRequestException('GAME_PIN_IS_NULL'));
    containsOnlyNumbers(pin, new BadRequestException('GAME_PIN_HAS_INCORRECT_FORMAT'));
    inInterval(
      pin,
      new Interval(GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH),
      new BadRequestException('GAME_PIN_HAS_INCORRECT_LENGTH'),
    );
    this._value = pin;
  }

  get value() {
    return this._value;
  }
}
