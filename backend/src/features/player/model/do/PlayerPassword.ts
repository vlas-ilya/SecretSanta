import { correctHash, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { PlayerPassword as PlayerPasswordVo } from 'model';
import { PlayerPin } from './PlayerPin';

export class PlayerPassword {
  private readonly _value;

  constructor(password: PlayerPasswordVo) {
    notNull(password, new BadRequestException('PLAYER_PASSWORD_IS_NULL'));
    correctHash(
      password,
      new BadRequestException('PLAYER_PASSWORD_HAS_INCORRECT_FORMAT'),
    );
    this._value = password;
  }

  get value(): string {
    return this._value;
  }

  static async create(
    pin: PlayerPin,
    passwordGenerator: (pin: string) => Promise<string>,
  ): Promise<PlayerPassword> {
    return new PlayerPassword(await passwordGenerator(pin.value));
  }
}
