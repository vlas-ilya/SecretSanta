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
import {
  PlayerId,
  PlayerName,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from './PlayerTypes';
import { ValidateResult, isValidNested, validate } from '../utils/validators/validators';

import { GameShortInfo } from './GameShortInfo';
import { PlayerChanges } from './PlayerChange';
import { Target } from './Target';
import { isBoolean } from '../utils/validators/typechecker/isBoolean';
import { isEnum } from '../utils/validators/typechecker/isEnum';
import { isNotEmpty } from '../utils/validators/common/isNotEmpty';
import { isString } from '../utils/validators/typechecker/isString';
import { length } from '../utils/validators/string/length';

export class Player {
  constructor(
    public id: PlayerId,
    public state: PlayerState,
    public hasPassword: boolean,
    public name: PlayerName | undefined,
    public wish: PlayerWish | undefined,
    public taboo: PlayerTaboo | undefined,
    public target: Target | undefined,
    public game: GameShortInfo,
  ) {}

  applyChanges(changes: PlayerChanges) {
    if ('name' in changes) {
      this.name = changes.name.value;
    }
    if ('wish' in changes) {
      this.wish = changes.wish.value;
    }
    if ('taboo' in changes) {
      this.taboo = changes.taboo.value;
    }
    if ('state' in changes) {
      this.state = changes.state.value;
    }
  }

  public static tryCreate(player?: any): ValidateResult<Player> {
    return validate<Player>(player)
      .required('id', (id, check) => {
        check(isNotEmpty(id), 'id is empty');
        check(isString(id), 'id is not a string');
      })
      .required('state', (state, check) => {
        check(isNotEmpty(state), 'state is empty');
        check(isEnum(state, PlayerState), 'state is not a PlayerState');
      })
      .required('hasPassword', (hasPassword, check) => {
        check(isNotEmpty(hasPassword), 'hasPassword is empty');
        check(isBoolean(hasPassword), 'hasPassword is not a boolean');
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
      .optional('target', (target, check, setResult) => {
        const [result, valid] = isValidNested(target, Target.tryCreate);
        check(valid, 'target is not valid');
        setResult(result);
      })
      .optional('game', (game, check, setResult) => {
        const [result, valid] = isValidNested(game, GameShortInfo.tryCreate);
        check(valid, 'game is not valid');
        setResult(result!);
      })
      .tryToCreate((value) => {
        return new Player(
          value.id,
          value.state,
          value.hasPassword,
          value.name,
          value.wish,
          value.taboo,
          value.target,
          value.game,
        );
      });
  }
}
