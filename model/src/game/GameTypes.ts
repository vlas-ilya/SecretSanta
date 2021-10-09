import { Id, Pin } from '../session/SessionTypes';

export type GameId = Id;
export type RegistrationId = string;
export type GamePin = Pin;
export type GamePassword = string;
export type GameTitle = string;
export type GameDescription = string;
export enum GameState {
  'INIT' = 'INIT',
  'RUN' = 'RUN',
  'ENDED' = 'ENDED',
}
