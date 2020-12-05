import { GameId, GameInfo, GameName, GameState, RegistrationId } from './Types';

import { Player } from './Player';

export class Game {
  id: GameId = '';
  gameState: GameState = 'INIT';
  registrationId?: RegistrationId = '';
  name?: GameName = '';
  info?: GameInfo = '';
  player?: Player = new Player();
  players?: Player[] = [];
}

export type GameChanges = { field: 'name'; value: GameName } | { field: 'info'; value: GameInfo };
