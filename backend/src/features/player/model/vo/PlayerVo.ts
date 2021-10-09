import { GameShortInfoVo } from './GameShortInfoVo';
import { TargetVo } from './TargetVo';
import { Change } from '../../../../utils/classes/Change';

export type PlayerIdVo = string;
export type PlayerStateVo = 'INIT' | 'ACTIVE';
export type PlayerNameVo = string;
export type PlayerWishVo = string;
export type PlayerTabooVo = string;
export type PlayerPasswordVo = string;
export type PlayerPinVo = string;

// TODO: Move to model project
export class PlayerVo {
  constructor(
    public id: PlayerIdVo,
    public state: PlayerStateVo = 'INIT',
    public hasPassword: boolean,
    public name?: PlayerNameVo,
    public wish?: PlayerWishVo,
    public taboo?: PlayerTabooVo,
    public target?: TargetVo,
    public game?: GameShortInfoVo,
  ) {}
}

export type PlayerChangesVo =
  | Change<PlayerVo, 'name'>
  | Change<PlayerVo, 'wish'>
  | Change<PlayerVo, 'taboo'>
  | Change<PlayerVo, 'state'>
  | {
      pin: {
        oldValue?: PlayerPinVo;
        newValue: PlayerPinVo;
      };
    };
