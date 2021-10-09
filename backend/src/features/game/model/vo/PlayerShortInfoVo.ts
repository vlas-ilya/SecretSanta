import { PlayerNameVo, PlayerStateVo } from '../../../player/model/vo/PlayerVo';

// TODO: Move to model project
export class PlayerShortInfoVo {
  constructor(public state: PlayerStateVo = 'INIT', public name?: PlayerNameVo) {}
}
