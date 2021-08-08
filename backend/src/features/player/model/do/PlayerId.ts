import {
  isUuid,
  notNull,
  PLAYER_ID_HAS_INCORRECT_FORMAT,
  PLAYER_ID_IS_NULL,
} from '../../../../utils/validators';

export class PlayerId {
  constructor(private _value: string) {
    notNull(_value, PLAYER_ID_IS_NULL);
    isUuid(_value, PLAYER_ID_HAS_INCORRECT_FORMAT);
  }

  get value(): string {
    return this._value;
  }
}
