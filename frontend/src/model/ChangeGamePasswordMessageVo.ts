import { ChangeGamePasswordMessage } from '../../../backend/src/model/ChangeGamePasswordMessage';
import { GamePassword } from '../../../backend/src/model/GameTypes';

export class ChangeGamePasswordMessageVo implements ChangeGamePasswordMessage {
  oldPassword: GamePassword = "";
  newPassword: GamePassword = "";
  confirmNewPassword: GamePassword = "";
}