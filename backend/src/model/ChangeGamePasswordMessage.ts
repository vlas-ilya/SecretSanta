import { GamePassword } from './GameTypes';

export interface ChangeGamePasswordMessage {
  oldPassword: GamePassword;
  newPassword: GamePassword;
}
