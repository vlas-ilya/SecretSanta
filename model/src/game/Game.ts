import {
  GAME_DESCRIPTION_ERROR_MESSAGE,
  GAME_DESCRIPTION_MAX_LENGTH,
  GAME_DESCRIPTION_MIN_LENGTH,
  GAME_TITLE_ERROR_MESSAGE,
  GAME_TITLE_MAX_LENGTH,
  GAME_TITLE_MIN_LENGTH,
} from './constants';
import {
  GameDescription,
  GameId,
  GameState,
  GameTitle,
  RegistrationId,
} from './GameTypes';
import {
  ValidateResult,
  isValidNestedArray,
  validate,
} from '../utils/validators/validators';

import { GameChanges } from './GameChange';
import { PlayerShortInfo } from './PlayerShortInfo';
import { isBoolean } from '../utils/validators/typechecker/isBoolean';
import { isEnum } from '../utils/validators/typechecker/isEnum';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { isString } from '../utils/validators/typechecker/isString';
import { length } from '../utils/validators/string/length';

export class Game {
  constructor(
    public id: GameId,
    public registrationId: RegistrationId,
    public state: GameState,
    public hasPassword: boolean,
    public title?: GameTitle,
    public description?: GameDescription,
    public players?: PlayerShortInfo[],
  ) {}

  applyChanges(changes: GameChanges) {
    if ('title' in changes) {
      this.title = changes.title.value;
    }
    if ('description' in changes) {
      this.description = changes.description.value;
    }
    if ('state' in changes) {
      this.state = changes.state.value;
    }
  }

  public static tryCreate(game?: any): ValidateResult<Game> {
    return validate<Game>(game)
      .required('id', (id, check) => {
        check(isNotEmpty(id), 'id is empty');
        check(isString(id), 'id is not a string');
      })
      .required('registrationId', (registrationId, check) => {
        check(isNotEmpty(registrationId), 'registrationId is empty');
        check(isString(registrationId), 'registrationId is not a string');
      })
      .required('state', (state, check) => {
        check(isNotEmpty(state), 'state is empty');
        check(isEnum(state, GameState), 'state is not a GameState');
      })
      .required('hasPassword', (hasPassword, check) => {
        check(isNotEmpty(hasPassword), 'hasPassword is empty');
        check(isBoolean(hasPassword), 'hasPassword is not a boolean');
      })
      .optional('title', (title, check) => {
        check(isString(title), GAME_TITLE_ERROR_MESSAGE);
        check(
          length(title, GAME_TITLE_MIN_LENGTH, GAME_TITLE_MAX_LENGTH),
          GAME_TITLE_ERROR_MESSAGE,
        );
      })
      .optional('description', (description, check) => {
        check(isString(description), GAME_DESCRIPTION_ERROR_MESSAGE);
        check(
          length(description, GAME_DESCRIPTION_MIN_LENGTH, GAME_DESCRIPTION_MAX_LENGTH),
          GAME_DESCRIPTION_ERROR_MESSAGE,
        );
      })
      .optional('players', (players, check, setResult) => {
        const [result, valid] = isValidNestedArray(players, PlayerShortInfo.tryCreate);
        check(valid, 'players are not valid');
        setResult(result);
      })
      .tryToCreate((value) => {
        return new Game(
          value.id,
          value.registrationId,
          value.state,
          value.hasPassword,
          value.title,
          value.description,
          value.players,
        );
      });
  }
}
