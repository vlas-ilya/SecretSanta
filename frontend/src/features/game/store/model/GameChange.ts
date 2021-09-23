import { Change } from '../../../../utils/classes/Change';
import { Game } from './Game';

export class GameChange {
  constructor(public game: Game, public changes: GameChanges) {}
}

export type GameChanges =
  | Change<Game, 'title'>
  | Change<Game, 'description'>
  | Change<Game, 'state'>;
