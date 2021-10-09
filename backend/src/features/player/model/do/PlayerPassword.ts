import * as bcrypt from 'bcrypt';

import {
  PLAYER_PASSWORD_HAS_INCORRECT_FORMAT,
  PLAYER_PASSWORD_IS_NULL,
  correctHash,
  notNull,
} from '../../../../utils/validators';

import { PlayerPassword as PlayerPasswordVo } from 'model';
import { PlayerPin } from './PlayerPin';

export class PlayerPassword {
  private readonly _value;

  constructor(password: PlayerPasswordVo) {
    notNull(password, PLAYER_PASSWORD_IS_NULL);
    correctHash(password, PLAYER_PASSWORD_HAS_INCORRECT_FORMAT);
    this._value = password;
  }

  get value(): string {
    return this._value;
  }

  static async create(pin: PlayerPin): Promise<PlayerPassword> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pin.value, salt);
    return new PlayerPassword(hash);
  }
}
