import { PlayerNameVo, PlayerStateVo, PlayerTabooVo, PlayerWishVo } from './PlayerVo';

export class TargetVo {
  constructor(
    public state: PlayerStateVo = 'INIT',
    public name?: PlayerNameVo,
    public wish?: PlayerWishVo,
    public taboo?: PlayerTabooVo,
  ) {}
}
