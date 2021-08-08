import { PlayerNameVo, PlayerStateVo } from '../../../player/model/vo/PlayerVo';

export class PlayerShortInfoVo {
  constructor(public playerState: PlayerStateVo = 'INIT', public name?: PlayerNameVo) {}
}
