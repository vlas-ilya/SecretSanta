import {
  PLAYER_NAME_ERROR_MESSAGE,
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
} from '../player/constants';
import { PlayerId, PlayerName, PlayerState } from '../player/PlayerTypes';
import { ValidateResult, validate } from '../utils/validators/validators';

import { isEnum } from '../utils/validators/typechecker/isEnum';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { isString } from '../utils/validators/typechecker/isString';
import { length } from '../utils/validators/string/length';

export class PlayerShortInfo {
  constructor(public publicId: PlayerId, public state: PlayerState, public name?: PlayerName) {}

  public static tryCreate(playerShortInfo: any): ValidateResult<PlayerShortInfo> {
    return validate<PlayerShortInfo>(playerShortInfo)
      .required('publicId', (publicId, check) => {
        check(isNotEmpty(publicId), 'publicId is empty');
      })
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
      .tryToCreate((value) => {
        return new PlayerShortInfo(value.publicId, value.state, value.name);
      });
  }
}
