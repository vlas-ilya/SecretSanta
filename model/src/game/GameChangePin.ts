import {
  GAME_CHANGE_PIN_ERROR_MESSAGE,
  GAME_CHANGE_PIN_FORMAT_ERROR_MESSAGE,
  GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
  GAME_CHANGE_PIN_MAX_LENGTH,
  GAME_CHANGE_PIN_MIN_LENGTH,
} from './constants';
import { ValidateResult, validate } from '../utils/validators/validators';

import { GamePin } from './GameTypes';
import { isBoolean } from '../utils/validators/typechecker/isBoolean';
import { isDecimal } from '../utils/validators/string/isDecimal';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { length } from '../utils/validators/string/length';
import { matches } from '../utils/validators/string/matches';

export class GameChangePin {
  constructor(
    public newPin: GamePin,
    public confirmation: GamePin,
    public oldPin?: GamePin,
    public hasPassword?: boolean,
  ) {
    if (!oldPin || oldPin.length === 0) {
      this.oldPin = undefined;
    }
  }

  static build(
    newPin: GamePin,
    confirmation: GamePin,
    oldPin?: GamePin,
    hasPassword?: boolean,
  ): GameChangePin {
    return new GameChangePin(newPin, confirmation, oldPin, hasPassword);
  }

  public static tryCreate(gameChangePin: any): ValidateResult<GameChangePin> {
    return validate<GameChangePin>(gameChangePin)
      .required('newPin', (newPin, check) => {
        check(isNotEmpty(newPin), GAME_CHANGE_PIN_ERROR_MESSAGE);
        check(isDecimal(newPin), GAME_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
        check(
          length(newPin, GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH),
          GAME_CHANGE_PIN_ERROR_MESSAGE,
        );
      })
      .required('confirmation', (confirmation, check) => {
        check(isNotEmpty(confirmation), GAME_CHANGE_PIN_ERROR_MESSAGE);
        check(isDecimal(confirmation), GAME_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
        check(
          length(confirmation, GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH),
          GAME_CHANGE_PIN_ERROR_MESSAGE,
        );
        check(
          matches(confirmation, gameChangePin.newPin),
          GAME_CHANGE_PIN_INCORRECT_CONFIRMATION_ERROR_MESSAGE,
        );
      })
      .required('hasPassword', (hasPassword, check) => {
        check(isNotEmpty(hasPassword), 'Что-то пошло не так!');
        check(isBoolean(hasPassword), 'Что-то пошло не так!');
      })
      .requiredIf(
        'oldPin',
        !!gameChangePin.hasPassword || !!gameChangePin.oldPin,
        (oldPin, check) => {
          check(isNotEmpty(oldPin), GAME_CHANGE_PIN_ERROR_MESSAGE);
          check(isDecimal(oldPin), GAME_CHANGE_PIN_FORMAT_ERROR_MESSAGE);
          check(
            length(oldPin, GAME_CHANGE_PIN_MIN_LENGTH, GAME_CHANGE_PIN_MAX_LENGTH),
            GAME_CHANGE_PIN_ERROR_MESSAGE,
          );
        },
      )
      .tryToCreate(
        (value) =>
          new GameChangePin(
            value.newPin,
            value.confirmation,
            value.oldPin,
            value.hasPassword,
          ),
      );
  }
}
