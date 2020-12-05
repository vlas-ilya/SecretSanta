import { GameId, GameInfo, GameName, GameState, RegistrationId } from './Types';

import { Player } from './Player';

export interface Game {
  id?: GameId;
  gameState?: GameState;
  registrationId?: RegistrationId;
  name?: GameName;
  info?: GameInfo;
  player?: Player;
  players?: Player[];
}

export type GameChanges = { field: 'name'; value: GameName } | { field: 'info'; value: GameInfo };

export const emptyGame: Game = {};
