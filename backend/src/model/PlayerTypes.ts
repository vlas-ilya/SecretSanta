import Game from './GameTypes';

export type PlayerId = string;
export type PlayerState = 'INIT' | 'ACTIVE';
export type PlayerName = string;
export type PlayerPassword = string;
export type PlayerWish = string;
export type PlayerTaboo = string;

export default interface Player {
  id: PlayerId;
  playerState: PlayerState;
  name: PlayerName;
  password: PlayerPassword;
  wish: PlayerWish;
  taboo: PlayerTaboo;
  targetId?: PlayerId;
  game?: Game;
}

export type ChangePlayerName = { field: 'name'; value: PlayerName };
export type ChangePlayerWish = { field: 'wish'; value: PlayerWish };
export type ChangePlayerTaboo = { field: 'taboo'; value: PlayerTaboo };
export type ChangePlayerPassword = { field: 'password'; value: PlayerPassword };

export type PlayerChanges = ChangePlayerName | ChangePlayerWish | ChangePlayerTaboo;
