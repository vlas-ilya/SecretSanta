import { ChangePlayerPasswordMessage } from '../../../backend/src/model/ChangePlayerPasswordMessage';
import { GamePassword } from '../../../backend/src/model/GameTypes';

export class ChangePlayerPasswordMessageVo implements ChangePlayerPasswordMessage {
  oldPassword: GamePassword = '';
  newPassword: GamePassword = '';
  confirmNewPassword: GamePassword = '';
}
