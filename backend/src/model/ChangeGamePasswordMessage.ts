import { GamePassword } from './GameTypes';

export class ChangeGamePasswordMessage {
  oldPassword: GamePassword;
  newPassword: GamePassword;
}
