import {
  GAME_CHANGES_IS_EMPTY,
  GAME_CHANGES_IS_NULL,
  GAME_NEW_STATE_IS_NOT_CORRECT,
  GAME_NOT_ENOUGH_PLAYERS,
  GAME_OLD_PIN_IS_NOT_CORRECT,
  GAME_SHOULD_BE_IN_INIT_STATUS,
  isTrue,
  notEmpty,
  notNull,
} from '../../../../utils/validators';
import {
  GameChangePin as GameChangePinVo,
  GameChanges as GameChangesVo,
  Game as GameVo,
} from 'model';

import { Change } from '../../../../utils/classes/Change';
import { Game } from './Game';
import { GameDescription } from './GameDescription';
import { GamePassword } from './GamePassword';
import { GamePin } from './GamePin';
import { GameState } from './GameState';
import { GameTitle } from './GameTitle';
import { PlayerState } from '../../../player/model/do/PlayerState';

export type GameWasStarted = boolean;

const fields: (keyof GameVo | 'newPin')[] = ['title', 'description', 'newPin', 'state'];
const changedFields = (changes: GameChangesVo | GameChangePinVo) =>
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
  private constructor(
    private readonly changes: Changes,
    private readonly comparePinAndPassword: (
      pin: string,
      password: string,
    ) => Promise<boolean>,
  ) {}

  static async create(
    changes: GameChangesVo | GameChangePinVo,
    passwordGenerator: (pin: string) => Promise<string>,
    comparePinAndPassword: (pin: string, password: string) => Promise<boolean>,
  ): Promise<GameChanges> {
    notNull(changes, GAME_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), GAME_CHANGES_IS_EMPTY);
    return new GameChanges(
      await GameChanges.transform(changes, passwordGenerator),
      comparePinAndPassword,
    );
  }

  private static async transform(
    changesVo: GameChangesVo | GameChangePinVo,
    passwordGenerator: (pin: string) => Promise<string>,
  ): Promise<Changes> {
    const changes: Changes = {};
    if ('title' in changesVo) {
      (changes as ChangeTitle).title = {
        value: new GameTitle(changesVo.title.value.trim()),
      };
    }
    if ('description' in changesVo) {
      (changes as ChangeDescription).description = {
        value: new GameDescription(changesVo.description.value.trim()),
      };
    }
    if ('newPin' in changesVo) {
      (changes as ChangePassword).password = {
        value: await GamePassword.create(
          new GamePin(changesVo.newPin),
          passwordGenerator,
        ),
        oldValue: changesVo.oldPin && (await new GamePin(changesVo.oldPin)),
      };
    }
    if ('state' in changesVo) {
      (changes as ChangeState).state = {
        value: GameState[changesVo.state.value],
      };
    }
    return changes;
  }

  async apply(game: Game): Promise<[Game, GameWasStarted]> {
    'password' in this.changes &&
      (await this.correctOldPassword(game, this.changes, GAME_OLD_PIN_IS_NOT_CORRECT));
    'state' in this.changes &&
      GameChanges.correctNewState(game, this.changes, GAME_NEW_STATE_IS_NOT_CORRECT);

    const newState = this.loadValue(game, 'state');
    const newTitle = this.loadValue(game, 'title');
    const newDescription = this.loadValue(game, 'description');
    const newPassword = this.loadValue(game, 'password');

    if (newState !== GameState.INIT) {
      isTrue(
        !newTitle || newTitle.value === game.title?.value,
        GAME_SHOULD_BE_IN_INIT_STATUS,
      );
      isTrue(
        !newDescription || newDescription.value === game.description?.value,
        GAME_SHOULD_BE_IN_INIT_STATUS,
      );
    }

    const gameWasStarted = GameChanges.gameWasStarted(game.state, newState);
    if (gameWasStarted) {
      isTrue(
        game.players.filter((player) => player.state === PlayerState.ACTIVE).length >= 2,
        GAME_NOT_ENOUGH_PLAYERS,
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

    return [newGame, gameWasStarted];
  }

  private async correctOldPassword(
    game: Game,
    password: {
      password: {
        oldValue?: GamePin;
        value: GamePassword;
      };
    },
    errorMessage: Error,
  ) {
    if (game?.password?.value) {
      const isMatch = await this.comparePinAndPassword(
        password?.password?.oldValue?.value,
        game.password.value,
      );
      if (!isMatch) {
        throw errorMessage;
      }
    }
  }

  private static correctNewState(
    game: Game,
    state: Change<Game, 'state'>,
    errorMessage: Error,
  ) {
    const oldState = game?.state;
    const newState = state?.state?.value;

    notEmpty(oldState, errorMessage);
    notEmpty(newState, errorMessage);

    const correctNewState =
      (oldState === GameState.INIT && newState === GameState.INIT) ||
      (oldState === GameState.INIT && newState === GameState.RUN) ||
      (oldState === GameState.RUN && newState === GameState.RUN) ||
      (oldState === GameState.RUN && newState === GameState.ENDED) ||
      (oldState === GameState.ENDED && newState === GameState.ENDED);

    if (!correctNewState) {
      throw errorMessage;
    }
  }

  private static gameWasStarted(currentState: GameState, newState: GameState) {
    return currentState === GameState.INIT && newState == GameState.RUN;
  }

  private loadValue<T extends keyof Game>(game: Game, field: T): Game[T] {
    return field in this.changes ? this.changes[field as keyof Game].value : game[field];
  }
}
