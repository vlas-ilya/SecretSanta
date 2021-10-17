import { isUuid, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';

export class RegistrationId {
  constructor(private _value: string) {
    notNull(_value, new BadRequestException('GAME_ID_IS_NULL'));
    isUuid(_value, new BadRequestException('GAME_ID_HAS_INCORRECT_FORMAT'));
  }

  get value(): string {
    return this._value;
  }
}
