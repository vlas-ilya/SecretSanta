import Player, {
  PlayerId,
  PlayerName,
  PlayerPassword,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from '../../../backend/src/model/PlayerTypes';

import Game from '../../../backend/src/model/GameTypes';

export class PlayerVo implements Player {
  id: PlayerId = '';
  playerState: PlayerState = 'INIT';
  name: PlayerName = '';
  password: PlayerPassword = '';
  wish: PlayerWish = '';
  taboo: PlayerTaboo = '';
  targetId?: PlayerId;
  game?: Game;
  hasPassword: boolean = false;
}
