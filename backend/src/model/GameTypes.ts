import Player from './PlayerTypes';

export type GameId = string;
export type RegistrationId = string;
export type GamePassword = string;
export type GameTitle = string;
export type GameDescription = string;
export type GameState = 'INIT' | 'RUN' | 'ENDED';

export default interface Game {
  id: GameId;
  registrationId: RegistrationId;
  title: GameTitle;
  description: GameDescription;
  password: GamePassword;
  gameState: GameState;
  players: Player[];
}

export type ChangeGameTitle = { field: 'title'; value: GameTitle };
export type ChangeGameDescription = { field: 'description'; value: GameDescription };
export type ChangeGamePassword = { field: 'password'; value: GamePassword };

export type GameChanges = ChangeGameTitle | ChangeGameDescription;
