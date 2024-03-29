import {
  GameShortInfo as GameShortInfoVo,
  GameState as GameStateVo,
  Game as GameVo,
} from 'model';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { GameDescription } from './GameDescription';
import { GameDto } from '../dto/GameDto';
import { GameId } from './GameId';
import { GamePassword } from './GamePassword';
import { GameState } from './GameState';
import { GameTitle } from './GameTitle';
import { Player } from '../../../player/model/do/Player';
import { PlayerDto } from '../../../player/model/dto/PlayerDto';
import { RegistrationId } from './RegistrationId';
import { ifExist } from '../../../../utils/ifExist';
import { notNull } from '../../../../utils/validators';

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
    notNull(_id, new BadRequestException('GAME_ID_IS_NULL'));
    notNull(_registrationId, new BadRequestException('REGISTRATION_ID_IS_NULL'));
    notNull(_state, new BadRequestException('GAME_STATE_IS_NULL'));
  }

  get players(): Player[] {
    return this._players;
  }

  set players(players: Player[] ) {
    this._players = players;
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
      GameStateVo[this.state],
      this.password != null,
      this.title?.value,
      this.description?.value,
      this.players
        .filter((player) => player.state === 'ACTIVE')
        .map((player) => player.toShortInfoVo()),
    );
  }

  public toShortInfoVo(): GameShortInfoVo {
    return new GameShortInfoVo(
      GameStateVo[this.state],
      this.title?.value,
      this.description?.value,
    );
  }

  public static fromDto(gameDto: GameDto): Game {
    const game = new Game(
      new GameId(gameDto.id),
      new RegistrationId(gameDto.registrationId),
      gameDto.state as GameState,
      ifExist(gameDto.title, (title) => new GameTitle(title)),
      ifExist(gameDto.description, (description) => new GameDescription(description)),
      ifExist(gameDto.password, (password) => new GamePassword(password)),
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
    gameDto.state = this.state;
    gameDto.title = this.title?.value;
    gameDto.description = this.description?.value;
    gameDto.password = this.password?.value;
    gameDto.hasPassword = this.password?.value != null;
    gameDto.players = this.players.map((player) => {
      const playerDto = new PlayerDto();
      playerDto.id = player.id.value;
      playerDto.state = player.state;
      return playerDto;
    });
    return gameDto;
  }

  calculateTargets() {
    const targets = [...this.players];

    do {
      targets.sort(() => 0.5 - Math.random());
    } while (this.existCoincidences(targets, this.players));

    this.players.forEach((player, index) => (player.target = targets[index]));
  }

  private existCoincidences(targets: Player[], players: Player[]): boolean {
    return !!players.find((player, index) => player.id === targets[index].id);
  }
}
