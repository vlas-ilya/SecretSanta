import {
  GameDescriptionVo,
  GameIdVo,
  GameStateVo,
  GameTitleVo,
} from '../../../game/model/vo/GameVo';

export class GameShortInfoVo {
  constructor(
    public id: GameIdVo,
    public state: GameStateVo = 'INIT',
    public title?: GameTitleVo,
    public description?: GameDescriptionVo,
  ) {}
}
