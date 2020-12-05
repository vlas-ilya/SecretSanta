import { Object, PlayerDontWish, PlayerId, PlayerName, PlayerState, PlayerWish } from './Types';

export interface Player extends Object {
  id?: PlayerId;
  state?: PlayerState;
  name?: PlayerName;
  wish?: PlayerWish;
  dontWish?: PlayerDontWish;
  target?: PlayerId;
}

export const mockPlayer: Player = {};
