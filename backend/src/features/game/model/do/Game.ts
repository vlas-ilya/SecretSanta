import {
  GAME_ID_IS_NULL,
  GAME_STATE_IS_NULL,
  REGISTRATION_ID_IS_NULL,
  notNull,
} from '../../../../utils/validators';

import { GameDescription } from './GameDescription';
import { GameDto } from '../dto/GameDto';
import { GameId } from './GameId';
import { GamePassword } from './GamePassword';
import { GameShortInfoVo } from '../../../player/model/vo/GameShortInfoVo';
import { GameState } from './GameState';
import { GameTitle } from './GameTitle';
import { GameVo } from '../vo/GameVo';
import { Player } from '../../../player/model/do/Player';
import { PlayerDto } from '../../../player/model/dto/PlayerDto';
import { PlayerState } from '../../../player/model/do/PlayerState';
import { RegistrationId } from './RegistrationId';

export class Game {
  private _players: Player[] = [];

  constructor(
    private _id: GameId,
    private _registrationId: RegistrationId,
    private _state: GameState = GameState.INIT,
    private _title?: GameTitle,
    private _description?: GameDescription,
    private _password?: GamePassword,
  ) {
    notNull(_id, GAME_ID_IS_NULL);
    notNull(_registrationId, REGISTRATION_ID_IS_NULL);
    notNull(_state, GAME_STATE_IS_NULL);
  }

  get players(): Player[] {
    return this._players;
  }

  get id(): GameId {
    return this._id;
  }

  get registrationId(): RegistrationId {
    return this._registrationId;
  }

  get state(): GameState {
    return this._state;
  }

  get title(): GameTitle {
    return this._title;
  }

  get description(): GameDescription {
    return this._description;
  }

  get password(): GamePassword {
    return this._password;
  }

  public toVo(): GameVo {
    return new GameVo(
      this.id.value,
      this.registrationId.value,
      this.state,
      this.players
        .filter((player) => player.state === 'ACTIVE')
        .map((player) => player.toShortInfoVo()),
      this.password != null,
      this.title?.value,
      this.description?.value,
    );
  }

  public toShortInfoVo(): GameShortInfoVo {
    return new GameShortInfoVo(
      this.id.value,
      this.state,
      this.title?.value,
      this.description?.value,
    );
  }

  public static fromDto(gameDto: GameDto): Game {
    const game = new Game(
      new GameId(gameDto.id),
      new RegistrationId(gameDto.registrationId),
      gameDto.state as GameState,
      gameDto.title && new GameTitle(gameDto.title),
      gameDto.description && new GameDescription(gameDto.description),
      gameDto.password && new GamePassword({ password: gameDto.password }),
    );
    gameDto.players &&
      game.players.push(
        ...gameDto.players.map((playerDto) => Player.fromDto(playerDto, game)),
      );
    return game;
  }

  toDto(): GameDto {
    const gameDto = new GameDto();
    gameDto.id = this.id.value;
    gameDto.registrationId = this.registrationId.value;
    gameDto.title = this.title.value;
    gameDto.description = this.description.value;
    gameDto.state = this.state;
    gameDto.password = this.password?.value;
    gameDto.hasPassword = this.password?.value != null;
    gameDto.players = this.players.map((player) => {
      const playerDto = new PlayerDto();
      playerDto.id = player.id.value;
      return playerDto;
    });
    return gameDto;
  }

  calculateTargets() {
    const players = this.players.filter((player) => player.state === PlayerState.ACTIVE);
    const targets = [...players];

    do {
      targets.sort(() => 0.5 - Math.random());
    } while (this.existCoincidences(targets, players));

    players.forEach((player, index) => (player.target = targets[index]));
  }

  existCoincidences(targets: Player[], players: Player[]): boolean {
    return !!players.find((player, index) => player.id === targets[index].id);
  }
}
