import { Change } from '../utils/classes/Change';
import { Game } from './Game';
import { PlayerId } from '../player/PlayerTypes';

export class GameChange {
  constructor(public game: Game, public changes: GameChanges) {}
}

export type RemovePlayer = {
  removedPlayerId: PlayerId;
};

export type GameChanges =
  | Change<Game, 'title'>
  | Change<Game, 'description'>
  | Change<Game, 'state'>
  | RemovePlayer;
