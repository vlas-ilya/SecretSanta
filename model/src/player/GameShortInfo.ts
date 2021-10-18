import {
  GAME_DESCRIPTION_ERROR_MESSAGE,
  GAME_DESCRIPTION_MAX_LENGTH,
  GAME_DESCRIPTION_MIN_LENGTH,
  GAME_TITLE_ERROR_MESSAGE,
  GAME_TITLE_MAX_LENGTH,
  GAME_TITLE_MIN_LENGTH,
} from '../game/constants';
import { GameDescription, GameState, GameTitle } from '../game/GameTypes';
import { ValidateResult, validate } from '../utils/validators/validators';

import { isEnum } from '../utils/validators/typechecker/isEnum';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { isString } from '../utils/validators/typechecker/isString';
import { length } from '../utils/validators/string/length';

export class GameShortInfo {
  constructor(
    public state: GameState,
    public title?: GameTitle,
    public description?: GameDescription,
  ) {}

  public static tryCreate(gameShortInfo?: any): ValidateResult<GameShortInfo> {
    return validate<GameShortInfo>(gameShortInfo)
      .required('state', (state, check) => {
        check(isNotEmpty(state), 'state is empty');
        check(isEnum(state, GameState), 'state is not a GameState');
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
      .tryToCreate((value) => {
        return new GameShortInfo(value.state, value.title, value.description);
      });
  }
}
