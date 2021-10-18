import {
  PLAYER_NAME_ERROR_MESSAGE,
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
  PLAYER_TABOO_ERROR_MESSAGE,
  PLAYER_TABOO_MAX_LENGTH,
  PLAYER_TABOO_MIN_LENGTH,
  PLAYER_WISH_ERROR_MESSAGE,
  PLAYER_WISH_MAX_LENGTH,
  PLAYER_WISH_MIN_LENGTH,
} from './constants';
import { PlayerName, PlayerState, PlayerTaboo, PlayerWish } from './PlayerTypes';
import { ValidateResult, validate } from '../utils/validators/validators';

import { isEnum } from '../utils/validators/typechecker/isEnum';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { isString } from '../utils/validators/typechecker/isString';
import { length } from '../utils/validators/string/length';

export class Target {
  constructor(
    public state: PlayerState,
    public name: PlayerName | undefined,
    public wish: PlayerWish | undefined,
    public taboo: PlayerTaboo | undefined,
  ) {}

  public static tryCreate(target?: any): ValidateResult<Target> {
    return validate<Target>(target)
      .required('state', (state, check) => {
        check(isNotEmpty(state), 'state is empty');
        check(isEnum(state, PlayerState), 'state is not a PlayerState');
      })
      .optional('name', (name, check) => {
        check(isString(name), PLAYER_NAME_ERROR_MESSAGE);
        check(
          length(name, PLAYER_NAME_MIN_LENGTH, PLAYER_NAME_MAX_LENGTH),
          PLAYER_NAME_ERROR_MESSAGE,
        );
      })
      .optional('wish', (wish, check) => {
        check(isString(wish), PLAYER_WISH_ERROR_MESSAGE);
        check(
          length(wish, PLAYER_WISH_MIN_LENGTH, PLAYER_WISH_MAX_LENGTH),
          PLAYER_WISH_ERROR_MESSAGE,
        );
      })
      .optional('taboo', (taboo, check) => {
        check(isString(taboo), PLAYER_TABOO_ERROR_MESSAGE);
        check(
          length(taboo, PLAYER_TABOO_MIN_LENGTH, PLAYER_TABOO_MAX_LENGTH),
          PLAYER_TABOO_ERROR_MESSAGE,
        );
      })
      .tryToCreate((value) => {
        return new Target(value.state, value.name, value.wish, value.taboo);
      });
  }
}
