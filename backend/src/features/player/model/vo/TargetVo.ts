import { PlayerNameVo, PlayerStateVo, PlayerTabooVo, PlayerWishVo } from './PlayerVo';

// TODO: Move to model project
export class TargetVo {
  constructor(
    public state: PlayerStateVo = 'INIT',
    public name?: PlayerNameVo,
    public wish?: PlayerWishVo,
    public taboo?: PlayerTabooVo,
  ) {}
}
