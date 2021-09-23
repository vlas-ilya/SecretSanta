import { PlayerNameVo, PlayerStateVo } from '../../../player/model/vo/PlayerVo';

export class PlayerShortInfoVo {
  constructor(public state: PlayerStateVo = 'INIT', public name?: PlayerNameVo) {}
}
