import { Change } from '../utils/classes/Change';
import { Player } from './Player';

export class PlayerChange {
  constructor(public player: Player, public changes: PlayerChanges) {}
}

export type PlayerChanges =
  | Change<Player, 'name'>
  | Change<Player, 'wish'>
  | Change<Player, 'taboo'>
  | Change<Player, 'state'>;
