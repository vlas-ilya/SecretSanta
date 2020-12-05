import { PlayerDontWish, PlayerId, PlayerName, PlayerState, PlayerWish } from './Types';

export class Player {
  id?: PlayerId;
  state?: PlayerState;
  name?: PlayerName;
  wish?: PlayerWish;
  dontWish?: PlayerDontWish;
  target?: PlayerId;
}

export type PlayerChanges =
  | { field: 'name'; value: PlayerName }
  | { field: 'wish'; value: PlayerWish }
  | { field: 'dontWish'; value: PlayerDontWish };

export const emptyPlayer: Player = {};
