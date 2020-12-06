import { PlayerPassword } from './PlayerTypes';

export class ChangePlayerPasswordMessage {
  oldPassword: PlayerPassword;
  newPassword: PlayerPassword;
}
