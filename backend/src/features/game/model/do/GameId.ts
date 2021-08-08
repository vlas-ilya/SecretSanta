import {
  GAME_ID_HAS_INCORRECT_FORMAT,
  GAME_ID_IS_NULL,
  isUuid,
  notNull,
} from '../../../../utils/validators';

export class GameId {
  constructor(private _value: string) {
    notNull(_value, GAME_ID_IS_NULL);
    isUuid(_value, GAME_ID_HAS_INCORRECT_FORMAT);
  }

  get value(): string {
    return this._value;
  }
}
