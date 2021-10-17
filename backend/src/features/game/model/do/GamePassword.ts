import { GamePassword as GamePasswordVo, GamePin as GamePinVo } from 'model';
import { correctHash, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
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
    notNull(password, new BadRequestException('GAME_PASSWORD_IS_NULL'));
    correctHash(password, new BadRequestException('GAME_PASSWORD_IS_NOT_CORRECT'));
    this._value = password;
  }

  get value(): string {
    return this._value;
  }

  static async create(
    pin: GamePin,
    passwordGenerator: (pin: string) => Promise<string>,
  ): Promise<GamePassword> {
    return new GamePassword(await passwordGenerator(pin.value));
  }
}
