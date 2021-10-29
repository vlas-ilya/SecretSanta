import {
  Player as PlayerVo,
  PlayerShortInfo as PlayerShortInfoVo,
  PlayerState as PlayerStateVo,
  Target as TargetVo,
} from 'model';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { Game } from '../../../game/model/do/Game';
import { GameDto } from '../../../game/model/dto/GameDto';
import { PlayerDto } from '../dto/PlayerDto';
import { PlayerId } from './PlayerId';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerWish } from './PlayerWish';
import { ifExist } from '../../../../utils/ifExist';
import { notNull } from '../../../../utils/validators';

export class Player {
  constructor(
    private _id: PlayerId,
    private _publicId: PlayerId,
    private _state: PlayerState = PlayerState.INIT,
    private _game: Game,
    private _name?: PlayerName,
    private _password?: PlayerPassword,
    private _wish?: PlayerWish,
    private _taboo?: PlayerTaboo,
    private _target?: Player,
  ) {
    notNull(_id, new BadRequestException('PLAYER_ID_IS_NULL'));
    notNull(_id, new BadRequestException('PLAYER_STATE_IS_NULL'));
  }

  get id(): PlayerId {
    return this._id;
  }

  get publicId(): PlayerId {
    return this._publicId;
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
      PlayerStateVo[this.state],
      this.password != null,
      this.name?.value,
      this.wish?.value,
      this.taboo?.value,
      this.target?.toTargetVo(),
      this.game?.toShortInfoVo(),
    );
  }

  toShortInfoVo(): PlayerShortInfoVo {
    return new PlayerShortInfoVo(this.publicId?.value, PlayerStateVo[this.state], this.name?.value);
  }

  toTargetVo(): TargetVo {
    return new TargetVo(
      PlayerStateVo[this.state],
      this.name?.value,
      this.wish?.value,
      this.taboo?.value,
    );
  }

  static fromDto(playerDto: PlayerDto, game: Game): Player {
    return new Player(
      new PlayerId(playerDto.id),
      new PlayerId(playerDto.publicId),
      playerDto.state as PlayerState,
      game,
      ifExist(playerDto.name, (name) => new PlayerName(name)),
      ifExist(playerDto.password, (password) => new PlayerPassword(password)),
      ifExist(playerDto.wish, (wish) => new PlayerWish(wish)),
      ifExist(playerDto.taboo, (taboo) => new PlayerTaboo(taboo)),
      ifExist(
        playerDto.target,
        (target) =>
          new Player(
            new PlayerId(target.id),
            new PlayerId(target.publicId),
            target.state as PlayerState,
            game,
            ifExist(target.name, (name) => new PlayerName(name)),
            null,
            ifExist(target.wish, (wish) => new PlayerWish(wish)),
            ifExist(target.taboo, (taboo) => new PlayerTaboo(taboo)),
          ),
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

  markAsDeleted(): Player {
    return new Player(
      this.id,
      this.publicId,
      PlayerState.DELETED,
      this.game,
      this.name,
      this.password,
      this.wish,
      this.taboo,
      this.target,
    );
  }
}
