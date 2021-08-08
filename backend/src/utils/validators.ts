import { BadRequestException } from '../exceptions/BadRequestException';
import { Change } from './classes/Change';
import { ConflictException } from '../exceptions/ConflictException';
import { Game } from '../features/game/model/do/Game';
import { GamePassword } from '../features/game/model/do/GamePassword';
import { GameState } from '../features/game/model/do/GameState';
import { Interval } from './classes/Interval';
import { NotFoundException } from '../exceptions/NotFoundException';
import { Player } from '../features/player/model/do/Player';
import { PlayerPassword } from '../features/player/model/do/PlayerPassword';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export const GAME_ID_IS_NULL = new BadRequestException('GAME_ID_IS_NULL');
export const GAME_ID_HAS_INCORRECT_FORMAT = new BadRequestException(
  'GAME_ID_HAS_INCORRECT_FORMAT',
);
export const REGISTRATION_ID_IS_NULL = new BadRequestException('REGISTRATION_ID_IS_NULL');
export const GAME_STATE_IS_NULL = new BadRequestException('GAME_STATE_IS_NULL');
export const GAME_DESCRIPTION_IS_NULL = new BadRequestException(
  'GAME_DESCRIPTION_IS_NULL',
);
export const GAME_DESCRIPTION_HAS_INCORRECT_LENGTH = new BadRequestException(
  'GAME_DESCRIPTION_HAS_INCORRECT_LENGTH',
);
export const GAME_TITLE_IS_NULL = new BadRequestException('GAME_DESCRIPTION_IS_NULL');
export const GAME_TITLE_HAS_INCORRECT_LENGTH = new BadRequestException(
  'GAME_DESCRIPTION_HAS_INCORRECT_LENGTH',
);
export const GAME_PIN_IS_NULL = new BadRequestException('GAME_PIN_IS_NULL');
export const GAME_PIN_HAS_INCORRECT_FORMAT = new BadRequestException(
  'GAME_PIN_HAS_INCORRECT_FORMAT',
);
export const GAME_PIN_HAS_INCORRECT_LENGTH = new BadRequestException(
  'GAME_PIN_HAS_INCORRECT_LENGTH',
);
export const GAME_PASSWORD_IS_NULL = new BadRequestException('GAME_PASSWORD_IS_NULL');
export const GAME_PASSWORD_IS_NOT_CORRECT = new BadRequestException(
  'GAME_PASSWORD_IS_NOT_CORRECT',
);
export const GAME_CHANGES_IS_NULL = new BadRequestException('GAME_CHANGES_IS_NULL');
export const GAME_CHANGES_IS_EMPTY = new BadRequestException('GAME_CHANGES_IS_EMPTY');
export const GAME_OLD_PIN_IS_NOT_CORRECT = new BadRequestException(
  'GAME_OLD_PIN_IS_NOT_CORRECT',
);
export const GAME_NEW_STATE_IS_NOT_CORRECT = new BadRequestException(
  'GAME_NEW_STATE_IS_NOT_CORRECT',
);
export const GAME_SHOULD_BE_IN_INIT_STATUS = new ConflictException(
  'GAME_SHOULD_BE_IN_INIT_STATUS',
);
export const GAME_NOT_FOUND = new NotFoundException('GAME_NOT_FOUND');
export const GAME_PASSWORD_IS_INCORRECT = new UnauthorizedException(
  'GAME_PASSWORD_IS_INCORRECT',
);

export const PLAYER_ID_IS_NULL = new BadRequestException('PLAYER_ID_IS_NULL');
export const PLAYER_ID_HAS_INCORRECT_FORMAT = new BadRequestException(
  'PLAYER_ID_HAS_INCORRECT_FORMAT',
);
export const PLAYER_PASSWORD_IS_NULL = new BadRequestException('PLAYER_PASSWORD_IS_NULL');
export const PLAYER_PASSWORD_HAS_INCORRECT_FORMAT = new BadRequestException(
  'PLAYER_PASSWORD_HAS_INCORRECT_FORMAT',
);
export const PLAYER_PIN_IS_NULL = new BadRequestException('PLAYER_PIN_IS_NULL');
export const PLAYER_PIN_HAS_INCORRECT_FORMAT = new BadRequestException(
  'PLAYER_PIN_HAS_INCORRECT_FORMAT',
);
export const PLAYER_PIN_HAS_INCORRECT_LENGTH = new BadRequestException(
  'PLAYER_PIN_HAS_INCORRECT_LENGTH',
);
export const PLAYER_NAME_IS_NULL = new BadRequestException('PLAYER_NAME_IS_NULL');
export const PLAYER_NAME_HAS_INCORRECT_LENGTH = new BadRequestException(
  'PLAYER_NAME_HAS_INCORRECT_LENGTH',
);
export const PLAYER_TABOO_IS_NULL = new BadRequestException('PLAYER_TABOO_IS_NULL');
export const PLAYER_TABOO_HAS_INCORRECT_LENGTH = new BadRequestException(
  'PLAYER_TABOO_HAS_INCORRECT_LENGTH',
);
export const PLAYER_WISH_IS_NULL = new BadRequestException(
  'PLAYER_TABOO_HAS_INCORRECT_LENGTH',
);
export const PLAYER_WISH_HAS_INCORRECT_LENGTH = new BadRequestException(
  'PLAYER_TABOO_HAS_INCORRECT_LENGTH',
);
export const PLAYER_STATE_IS_NULL = new BadRequestException('PLAYER_STATE_IS_NULL');
export const PLAYER_NOT_FOUND = new NotFoundException('PLAYER_NOT_FOUND');
export const PLAYER_PASSWORD_IS_INCORRECT = new UnauthorizedException(
  'PLAYER_PASSWORD_IS_INCORRECT',
);
export const PLAYER_CHANGES_IS_NULL = new BadRequestException('PLAYER_CHANGES_IS_NULL');
export const PLAYER_CHANGES_IS_EMPTY = new BadRequestException('PLAYER_CHANGES_IS_EMPTY');
export const PLAYER_OLD_PIN_IS_NOT_CORRECT = new BadRequestException(
  'PLAYER_OLD_PIN_IS_NOT_CORRECT',
);

export const START_SHOULD_BE_NOT_NULL = new BadRequestException(
  'START_SHOULD_BE_NOT_NULL',
);
export const END_SHOULD_BE_NOT_NULL = new BadRequestException('END_SHOULD_BE_NOT_NULL');
export const START_SHOULD_BE_GREATER_END = new BadRequestException(
  'START_SHOULD_BE_GREATER_END',
);

export const UNAUTHORIZED_EXCEPTION = 'UNAUTHORIZED_EXCEPTION';

export function notNull<T>(value: T, errorMessage: Error) {
  if (value === null || value === undefined) {
    throw errorMessage;
  }
}

export function isGreater(minValue: number, maxValue: number, errorMessage: Error) {
  notNull(minValue, errorMessage);
  notNull(maxValue, errorMessage);
  if (minValue >= maxValue) {
    throw errorMessage;
  }
}

export function inInterval<T extends string>(
  value: T,
  interval: Interval,
  errorMessage: Error,
) {
  notNull(value, errorMessage);
  if (!interval.include(value.length)) {
    throw errorMessage;
  }
}

export function isUuid<T extends string>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!isUUID(value)) {
    throw errorMessage;
  }
}

export function containsOnlyNumbers<T extends string>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!/^\d+$/.test(value)) {
    throw errorMessage;
  }
}

export function notEmpty<T extends { length: number }>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!value?.length) {
    throw errorMessage;
  }
}

export function correctOldPassword(
  game: Game,
  password: {
    password: {
      oldValue?: GamePassword;
      value: GamePassword;
    };
  },
  errorMessage: Error,
) {
  if (game?.password?.value !== password?.password?.oldValue?.value) {
    throw errorMessage;
  }
}

export function correctOldPlayerPassword(
  player: Player,
  password: {
    password: {
      oldValue?: PlayerPassword;
      value: PlayerPassword;
    };
  },
  errorMessage: Error,
) {
  if (player?.password?.value !== password?.password?.oldValue?.value) {
    throw errorMessage;
  }
}

export function correctNewState(
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

export function correctHash<T extends string>(value: T, errorMessage: Error) {
  notEmpty(value, errorMessage);
  // TODO: проверить регэкспом
}

export function isTrue(condition: boolean, error: Error) {
  if (!condition) {
    throw error;
  }
}

export function isFalse(condition: boolean, error: Error) {
  isTrue(!condition, error);
}
