import * as bcrypt from 'bcrypt';

import {
  GAME_PASSWORD_IS_NOT_CORRECT,
  GAME_PASSWORD_IS_NULL,
  correctHash,
  notNull,
} from '../../../../utils/validators';

import { GamePasswordVo, GamePinVo } from '../vo/GameVo';
import { GamePin } from './GamePin';

export type InitValue =
  | {
      pin: GamePinVo;
    }
  | {
      password: string;
    };

export class GamePassword {
  private readonly _value;

  constructor(password: GamePasswordVo) {
    notNull(password, GAME_PASSWORD_IS_NULL);
    correctHash(password, GAME_PASSWORD_IS_NOT_CORRECT);
    this._value = password;
  }

  get value(): string {
    return this._value;
  }

  static async create(pin: GamePin): Promise<GamePassword> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pin.value, salt);
    return new GamePassword(hash);
  }
}
