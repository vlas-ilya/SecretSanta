import {
  Change,
  PlayerChangePin as PlayerChangePinVo,
  PlayerChanges as PlayerChangesVo,
  Player as PlayerVo,
} from 'model';
import { isFalse, notEmpty, notNull } from '../../../../utils/validators';

import { BadRequestException } from '../../../../exceptions/BadRequestException';
import { Player } from './Player';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerPin } from './PlayerPin';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerWish } from './PlayerWish';

const fields: (keyof PlayerVo | 'newPin')[] = [
  'name',
  'wish',
  'taboo',
  'state',
  'newPin',
];

const changedFields = (changes: PlayerChangesVo | PlayerChangePinVo) =>
  Object.keys(changes).filter((item) => fields.includes(item as keyof PlayerVo));

type ChangeName = Change<Player, 'name'>;
type ChangeWish = Change<Player, 'wish'>;
type ChangeTaboo = Change<Player, 'taboo'>;
type ChangePassword = {
  password: {
    oldValue?: PlayerPin;
    value: PlayerPassword;
  };
};
type Changes = {} | ChangeName | ChangeWish | ChangeTaboo | ChangePassword;

export class PlayerChanges {
  constructor(
    private readonly changes: Changes,
    private readonly comparePinAndPassword: (
      pin: string,
      password: string,
    ) => Promise<boolean>,
  ) {}

  static async create(
    changes: PlayerChangesVo | PlayerChangePinVo,
    passwordGenerator: (pin: string) => Promise<string>,
    comparePinAndPassword: (pin: string, password: string) => Promise<boolean>,
  ): Promise<PlayerChanges> {
    notNull(changes, new BadRequestException('PLAYER_CHANGES_IS_NULL'));
    notEmpty(changedFields(changes), new BadRequestException('PLAYER_CHANGES_IS_EMPTY'));
    return new PlayerChanges(
      await PlayerChanges.transform(changes, passwordGenerator),
      comparePinAndPassword,
    );
  }

  private static async transform(
    changesVo: PlayerChangesVo | PlayerChangePinVo,
    passwordGenerator: (pin: string) => Promise<string>,
  ): Promise<Changes> {
    const changes: Changes = {};
    if ('name' in changesVo) {
      (changes as ChangeName).name = {
        value: new PlayerName(changesVo.name.value.trim()),
      };
    }
    if ('wish' in changesVo) {
      (changes as ChangeWish).wish = {
        value: new PlayerWish(changesVo.wish.value.trim()),
      };
    }
    if ('taboo' in changesVo) {
      (changes as ChangeTaboo).taboo = {
        value: new PlayerTaboo(changesVo.taboo.value.trim()),
      };
    }
    if ('newPin' in changesVo) {
      (changes as ChangePassword).password = {
        value: await PlayerPassword.create(
          new PlayerPin(changesVo.newPin),
          passwordGenerator,
        ),
        oldValue: changesVo.oldPin && new PlayerPin(changesVo.oldPin),
      };
    }
    return changes;
  }

  async apply(player: Player): Promise<Player> {
    'password' in this.changes &&
      (await this.correctOldPlayerPassword(
        player,
        this.changes,
        new BadRequestException('PLAYER_OLD_PIN_IS_NOT_CORRECT'),
      ));

    isFalse(
      player.game.state !== 'INIT' && 'name' in this.changes,
      new BadRequestException('GAME_SHOULD_BE_IN_INIT_STATUS'),
    );

    const newName = this.loadValue(player, 'name');
    const newWish = this.loadValue(player, 'wish');
    const newTaboo = this.loadValue(player, 'taboo');
    const newPassword = this.loadValue(player, 'password');

    const needToChangeStatusToActive = !(
      Object.keys(this.changes).length === 1 && 'password' in this.changes
    );

    return new Player(
      player.id,
      needToChangeStatusToActive ? PlayerState.ACTIVE : player.state,
      player.game,
      newName,
      newPassword,
      newWish,
      newTaboo,
      player.target,
    );
  }

  private async correctOldPlayerPassword(
    player: Player,
    password: {
      password: {
        oldValue?: PlayerPin;
        value: PlayerPassword;
      };
    },
    errorMessage: Error,
  ) {
    if (player?.password?.value) {
      const isMatch = await this.comparePinAndPassword(
        password?.password?.oldValue?.value,
        player.password.value,
      );
      if (!isMatch) {
        throw errorMessage;
      }
    }
  }

  private loadValue<T extends keyof Player>(game: Player, field: T): Player[T] {
    return field in this.changes
      ? this.changes[field as keyof Player].value
      : game[field];
  }
}
