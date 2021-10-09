import { Id, Pin } from '../session/SessionTypes';

export type PlayerId = Id;
export enum PlayerState {
  'INIT' = 'INIT',
  'ACTIVE' = 'ACTIVE',
}
export type PlayerName = string;
export type PlayerWish = string;
export type PlayerTaboo = string;
export type PlayerPin = Pin;
export type PlayerPassword = string;
