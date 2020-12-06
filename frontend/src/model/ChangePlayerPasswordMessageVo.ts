import { GamePassword } from '../../../backend/src/model/GameTypes';
import { ChangePlayerPasswordMessage } from '../../../backend/src/model/ChangePlayerPasswordMessage';

export class ChangePlayerPasswordMessageVo implements ChangePlayerPasswordMessage {
  oldPassword: GamePassword = "";
  newPassword: GamePassword = "";
  confirmNewPassword: GamePassword = "";
}