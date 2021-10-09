import { Change } from '../../../../utils/classes/Change';
import { PlayerShortInfoVo } from './PlayerShortInfoVo';

export type GameIdVo = string;
export type RegistrationIdVo = string;
export type GamePinVo = string;
export type GamePasswordVo = string;
export type GameTitleVo = string;
export type GameDescriptionVo = string;
export type GameStateVo = 'INIT' | 'RUN' | 'ENDED';

// TODO: Move to model project
export class GameVo {
  constructor(
    public id: GameIdVo,
    public registrationId: RegistrationIdVo,
    public state: GameStateVo,
    public players: PlayerShortInfoVo[],
    public hasPassword: boolean,
    public title?: GameTitleVo,
    public description?: GameDescriptionVo,
  ) {}
}

export type GameChangesVo =
  | Change<GameVo, 'title'>
  | Change<GameVo, 'description'>
  | Change<GameVo, 'state'>
  | {
      pin: {
        oldValue?: GamePinVo;
        newValue: GamePinVo;
      };
    };
