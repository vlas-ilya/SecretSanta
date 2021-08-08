import { PlayerNameVo, PlayerStateVo, PlayerTabooVo, PlayerWishVo } from './PlayerVo';

export class TargetVo {
  constructor(
    public playerState: PlayerStateVo = 'INIT',
    public name?: PlayerNameVo,
    public wish?: PlayerWishVo,
    public taboo?: PlayerTabooVo,
  ) {}
}
