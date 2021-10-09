import {
  Change,
  PlayerChanges as PlayerChangesVo,
  PlayerChangePin as PlayerChangePinVo,
  Player as PlayerVo,
} from 'model';
import {
  PLAYER_CHANGES_IS_EMPTY,
  PLAYER_CHANGES_IS_NULL,
  PLAYER_OLD_PIN_IS_NOT_CORRECT,
  correctOldPlayerPassword,
  notEmpty,
  notNull,
} from '../../../../utils/validators';

import { Player } from './Player';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerPin } from './PlayerPin';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerWish } from './PlayerWish';
import passport from 'passport';

const fields: (keyof PlayerVo | 'newPin')[] = ['name', 'wish', 'taboo', 'state', 'newPin'];
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
  private changes: Changes = {};

  constructor() {}

  static async create(
    changes: PlayerChangesVo | PlayerChangePinVo,
  ): Promise<PlayerChanges> {
    notNull(changes, PLAYER_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), PLAYER_CHANGES_IS_EMPTY);
    const playerChanges = new PlayerChanges();
    playerChanges.changes = await PlayerChanges.transform(changes);
    return playerChanges;
  }

  private static async transform(
    changesVo: PlayerChangesVo | PlayerChangePinVo,
  ): Promise<Changes> {
    const changes: Changes = {};
    if ('name' in changesVo) {
      (changes as ChangeName).name = {
        value: new PlayerName(changesVo.name.value),
      };
    }
    if ('wish' in changesVo) {
      (changes as ChangeWish).wish = {
        value: new PlayerWish(changesVo.wish.value),
      };
    }
    if ('taboo' in changesVo) {
      (changes as ChangeTaboo).taboo = {
        value: new PlayerTaboo(changesVo.taboo.value),
      };
    }
    if ('newPin' in changesVo) {
      (changes as ChangePassword).password = {
        value: await PlayerPassword.create(new PlayerPin(changesVo.newPin)),
        oldValue: changesVo.oldPin && new PlayerPin(changesVo.oldPin),
      };
    }
    return changes;
  }

  async apply(player: Player): Promise<Player> {
    'password' in this.changes &&
      (await correctOldPlayerPassword(
        player,
        this.changes,
        PLAYER_OLD_PIN_IS_NOT_CORRECT,
      ));

    const newName = this.loadValue(player, 'name');
    const newWish = this.loadValue(player, 'wish');
    const newTaboo = this.loadValue(player, 'taboo');
    const newPassword = this.loadValue(player, 'password');

    const needToChangeStatus = !(Object.keys(this.changes).length === 1 && 'password' in this.changes);

    return new Player(
      player.id,
      needToChangeStatus ? PlayerState.ACTIVE : player.state,
      player.game,
      newName,
      newPassword,
      newWish,
      newTaboo,
      player.target,
    );
  }

  private loadValue<T extends keyof Player>(game: Player, field: T): Player[T] {
    return field in this.changes
      ? this.changes[field as keyof Player].value
      : game[field];
  }
}
