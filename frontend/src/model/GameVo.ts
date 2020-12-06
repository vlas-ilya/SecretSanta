import Game, {
  GameDescription,
  GameId,
  GamePassword,
  GameState,
  GameTitle,
  RegistrationId,
} from '../../../backend/src/model/GameTypes';

import { PlayerVo } from './PlayerVo';

export class GameVo implements Game {
  id: GameId = '';
  registrationId: RegistrationId = '';
  title: GameTitle = '';
  description: GameDescription = '';
  password: GamePassword = '';
  gameState: GameState = 'INIT';
  players: PlayerVo[] = [];
  hasPassword: boolean = false;
}
