import {
  GAME_CHANGES_IS_EMPTY,
  GAME_CHANGES_IS_NULL,
  GAME_NEW_STATE_IS_NOT_CORRECT,
  GAME_OLD_PIN_IS_NOT_CORRECT,
  GAME_SHOULD_BE_IN_INIT_STATUS,
  correctNewState,
  correctOldPassword,
  isTrue,
  notEmpty,
  notNull,
} from '../../../../utils/validators';
import { GameChangesVo, GameVo } from '../vo/GameVo';

import { Change } from '../../../../utils/classes/Change';
import { Game } from './Game';
import { GameDescription } from './GameDescription';
import { GamePassword } from './GamePassword';
import { GamePin } from './GamePin';
import { GameState } from './GameState';
import { GameTitle } from './GameTitle';

const fields: (keyof GameVo | 'pin')[] = ['title', 'description', 'pin', 'state'];
const changedFields = (changes: GameChangesVo) =>
  Object.keys(changes).filter((item) => fields.includes(item as keyof GameVo));

type ChangeTitle = Change<Game, 'title'>;
type ChangeDescription = Change<Game, 'description'>;
type ChangeState = Change<Game, 'state'>;
type ChangePassword = {
  password: {
    oldValue?: GamePin;
    value: GamePassword;
  };
};

type Changes = {} | ChangeTitle | ChangeDescription | ChangeState | ChangePassword;

export class GameChanges {
  private changes: Changes = {};

  private constructor() {}

  static async create(changes: GameChangesVo): Promise<GameChanges> {
    notNull(changes, GAME_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), GAME_CHANGES_IS_EMPTY);
    const gameChanges = new GameChanges();
    gameChanges.changes = await GameChanges.transform(changes);
    return gameChanges;
  }

  private static async transform(changesVo: GameChangesVo): Promise<Changes> {
    const changes: Changes = {};
    if ('title' in changesVo) {
      (changes as ChangeTitle).title = {
        value: new GameTitle(changesVo.title.value),
      };
    }
    if ('description' in changesVo) {
      (changes as ChangeDescription).description = {
        value: new GameDescription(changesVo.description.value),
      };
    }
    if ('pin' in changesVo) {
      (changes as ChangePassword).password = {
        value: await GamePassword.create(new GamePin(changesVo.pin.newValue)),
        oldValue: changesVo.pin.oldValue && (await new GamePin(changesVo.pin.oldValue)),
      };
    }
    if ('state' in changesVo) {
      (changes as ChangeState).state = {
        value: changesVo.state.value as GameState,
      };
    }
    return changes;
  }

  public apply(game: Game): Game {
    'password' in this.changes &&
      correctOldPassword(game, this.changes, GAME_OLD_PIN_IS_NOT_CORRECT);
    'state' in this.changes &&
      correctNewState(game, this.changes, GAME_NEW_STATE_IS_NOT_CORRECT);

    const newState = this.loadValue(game, 'state');
    const newTitle = this.loadValue(game, 'title');
    const newDescription = this.loadValue(game, 'description');
    const newPassword = this.loadValue(game, 'password');

    if (newState !== GameState.INIT) {
      isTrue(newTitle.value === game.title.value, GAME_SHOULD_BE_IN_INIT_STATUS);
      isTrue(
        newDescription.value === game.description.value,
        GAME_SHOULD_BE_IN_INIT_STATUS,
      );
    }

    const newGame = new Game(
      game.id,
      game.registrationId,
      newState,
      newTitle,
      newDescription,
      newPassword,
    );
    newGame.players.push(...game.players);

    return newGame;
  }

  private loadValue<T extends keyof Game>(game: Game, field: T): Game[T] {
    return field in this.changes ? this.changes[field as keyof Game].value : game[field];
  }
}
