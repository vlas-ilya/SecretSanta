import {
  PLAYER_CHANGE_PIN_ERROR_MESSAGE,
  PLAYER_CHANGE_PIN_FORMAT_ERROR_MESSAGE,
  PLAYER_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  PLAYER_CHANGE_PIN_MAX_LENGTH,
  PLAYER_CHANGE_PIN_MIN_LENGTH,
} from './constants';
import { ValidateResult, validate } from '../utils/validators/validators';

import { PlayerPin } from './PlayerTypes';
import { isBoolean } from '../utils/validators/typechecker/isBoolean';
import { isDecimal } from '../utils/validators/string/isDecimal';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { length } from '../utils/validators/string/length';
import { matches } from '../utils/validators/string/matches';

export class PlayerChangePin {
  constructor(
    public newPin: PlayerPin,
    public confirmation: PlayerPin,
    public oldPin?: PlayerPin,
    public hasPassword?: boolean,
  ) {
    if (!oldPin || oldPin.length === 0) {
      this.oldPin = undefined;
    }
  }

  static build(
    newPin: PlayerPin,
    confirmation: PlayerPin,
    oldPin?: PlayerPin,
    hasPassword?: boolean,
  ): PlayerChangePin {
    return new PlayerChangePin(newPin, confirmation, oldPin, hasPassword);
  }

  public static tryCreate(playerChangePin: any): ValidateResult<PlayerChangePin> {
    return validate<PlayerChangePin>(playerChangePin)
      .required('newPin', (newPin, check) => {
        check(isNotEmpty(newPin), PLAYER_CHANGE_PIN_ERROR_MESSAGE);
        check(isDecimal(newPin), PLAYER_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
        check(
          length(newPin, PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH),
          PLAYER_CHANGE_PIN_ERROR_MESSAGE,
        );
      })
      .required('confirmation', (confirmation, check) => {
        check(isNotEmpty(confirmation), PLAYER_CHANGE_PIN_ERROR_MESSAGE);
        check(isDecimal(confirmation), PLAYER_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
        check(
          length(
            confirmation,
            PLAYER_CHANGE_PIN_MIN_LENGTH,
            PLAYER_CHANGE_PIN_MAX_LENGTH,
          ),
          PLAYER_CHANGE_PIN_ERROR_MESSAGE,
        );
        check(
          matches(confirmation, playerChangePin.newPin),
          PLAYER_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
        );
      })
      .required('hasPassword', (hasPassword, check) => {
        check(isNotEmpty(hasPassword), 'Что-то пошло не так!');
        check(isBoolean(hasPassword), 'Что-то пошло не так!');
      })
      .requiredIf(
        'oldPin',
        !!playerChangePin.hasPassword || !!playerChangePin.oldPin,
        (oldPin, check) => {
          check(isNotEmpty(oldPin), PLAYER_CHANGE_PIN_ERROR_MESSAGE);
          check(isDecimal(oldPin), PLAYER_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
          check(
            length(oldPin, PLAYER_CHANGE_PIN_MIN_LENGTH, PLAYER_CHANGE_PIN_MAX_LENGTH),
            PLAYER_CHANGE_PIN_ERROR_MESSAGE,
          );
        },
      )
      .tryToCreate(
        (value) =>
          new PlayerChangePin(
            value.newPin,
            value.confirmation,
            value.oldPin,
            value.hasPassword,
          ),
      );
  }
}
