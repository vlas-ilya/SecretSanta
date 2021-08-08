import {
  PLAYER_CHANGES_IS_EMPTY,
  PLAYER_CHANGES_IS_NULL,
  PLAYER_OLD_PIN_IS_NOT_CORRECT,
  correctOldPlayerPassword,
  notEmpty,
  notNull,
} from '../../../../utils/validators';
import { PlayerChangesVo, PlayerVo } from '../vo/PlayerVo';

import { Change } from '../../../../utils/classes/Change';
import { Player } from './Player';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerWish } from './PlayerWish';

const fields: (keyof PlayerVo | 'pin')[] = ['name', 'wish', 'taboo', 'state', 'pin'];
const changedFields = (changes: PlayerChangesVo) =>
  Object.keys(changes).filter((item) => fields.includes(item as keyof PlayerVo));

type ChangeName = Change<Player, 'name'>;
type ChangeWish = Change<Player, 'wish'>;
type ChangeTaboo = Change<Player, 'taboo'>;
type ChangePassword = {
  password: {
    oldValue?: PlayerPassword;
    value: PlayerPassword;
  };
};
type Changes = {} | ChangeName | ChangeWish | ChangeTaboo | ChangePassword;

export class PlayerChanges {
  private changes: Changes = {};

  constructor(changes: PlayerChangesVo) {
    notNull(changes, PLAYER_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), PLAYER_CHANGES_IS_EMPTY);
    this.transform(changes);
  }

  private transform(changes: PlayerChangesVo) {
    if ('name' in changes) {
      (this.changes as ChangeName).name = {
        value: new PlayerName(changes.name.value),
      };
    }
    if ('wish' in changes) {
      (this.changes as ChangeWish).wish = {
        value: new PlayerWish(changes.wish.value),
      };
    }
    if ('taboo' in changes) {
      (this.changes as ChangeTaboo).taboo = {
        value: new PlayerTaboo(changes.taboo.value),
      };
    }
    if ('pin' in changes) {
      (this.changes as ChangePassword).password = {
        oldValue: PlayerPassword.createOrNull({ pin: changes.pin.oldValue }),
        value: new PlayerPassword({ pin: changes.pin.newValue }),
      };
    }
  }

  apply(player: Player): Player {
    'password' in this.changes &&
      correctOldPlayerPassword(player, this.changes, PLAYER_OLD_PIN_IS_NOT_CORRECT);

    const newName = this.loadValue(player, 'name');
    const newWish = this.loadValue(player, 'wish');
    const newTaboo = this.loadValue(player, 'taboo');
    const newPassword = this.loadValue(player, 'password');

    return new Player(
      player.id,
      PlayerState.ACTIVE,
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
