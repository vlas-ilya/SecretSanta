import {
  PLAYER_ID_IS_NULL,
  PLAYER_STATE_IS_NULL,
  notNull,
} from '../../../../utils/validators';

import { Game } from '../../../game/model/do/Game';
import { GameDto } from '../../../game/model/dto/GameDto';
import { PlayerDto } from '../dto/PlayerDto';
import { PlayerId } from './PlayerId';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerShortInfoVo } from '../../../game/model/vo/PlayerShortInfoVo';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerVo } from '../vo/PlayerVo';
import { PlayerWish } from './PlayerWish';
import { TargetVo } from '../vo/TargetVo';

export class Player {
  constructor(
    private _id: PlayerId,
    private _state: PlayerState = PlayerState.INIT,
    private _game: Game,
    private _name?: PlayerName,
    private _password?: PlayerPassword,
    private _wish?: PlayerWish,
    private _taboo?: PlayerTaboo,
    private _target?: Player,
  ) {
    notNull(_id, PLAYER_ID_IS_NULL);
    notNull(_id, PLAYER_STATE_IS_NULL);
  }

  get id(): PlayerId {
    return this._id;
  }

  get state(): PlayerState {
    return this._state;
  }

  get name(): PlayerName {
    return this._name;
  }

  get password(): PlayerPassword {
    return this._password;
  }

  get wish(): PlayerWish {
    return this._wish;
  }

  get taboo(): PlayerTaboo {
    return this._taboo;
  }

  get target(): Player {
    return this._target;
  }

  set target(value: Player | undefined) {
    this._target = value;
  }

  get game(): Game {
    return this._game;
  }

  toVo(): PlayerVo {
    return new PlayerVo(
      this.id.value,
      this.state,
      this.password != null,
      this.name?.value,
      this.wish?.value,
      this.taboo?.value,
      this.target?.toTargetVo(),
      this.game?.toShortInfoVo(),
    );
  }

  toShortInfoVo(): PlayerShortInfoVo {
    return new PlayerShortInfoVo(this.state, this.name?.value);
  }

  toTargetVo(): TargetVo {
    return new TargetVo(
      this.state,
      this.name?.value,
      this.wish?.value,
      this.taboo?.value,
    );
  }

  static fromDto(playerDto: PlayerDto, game: Game): Player {
    return new Player(
      new PlayerId(playerDto.id),
      playerDto.state as PlayerState,
      game,
      playerDto.name && new PlayerName(playerDto.name),
      playerDto.password && new PlayerPassword({ password: playerDto.password }),
      playerDto.wish && new PlayerWish(playerDto.wish),
      playerDto.taboo && new PlayerTaboo(playerDto.taboo),
      playerDto.target &&
        new Player(
          new PlayerId(playerDto.target.id),
          playerDto.target.state as PlayerState,
          game,
          playerDto.target.name && new PlayerName(playerDto.target.name),
          null,
          playerDto.target.wish && new PlayerWish(playerDto.target.wish),
          playerDto.target.taboo && new PlayerTaboo(playerDto.target.taboo),
        ),
    );
  }

  toDto(): PlayerDto {
    const playerDto = new PlayerDto();
    playerDto.id = this.id.value;
    playerDto.state = this.state;
    playerDto.name = this.name?.value;
    playerDto.password = this.password?.value;
    playerDto.wish = this.wish?.value;
    playerDto.taboo = this.taboo?.value;
    if (this.target) {
      playerDto.target = new PlayerDto();
      playerDto.target.id = this.target.id.value;
    }
    playerDto.game = new GameDto();
    playerDto.game.id = this.game.id.value;

    return playerDto;
  }
}
