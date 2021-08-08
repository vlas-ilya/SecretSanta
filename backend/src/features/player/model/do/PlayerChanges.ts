import {
  PLAYER_CHANGES_IS_EMPTY,
  PLAYER_CHANGES_IS_NULL,
  PLAYER_OLD_PIN_IS_NOT_CORRECT,
  correctOldPlayerPassword,
  notEmpty,
  notNull,
} from '../../../../utils/validators';

import { Change } from '../../../../utils/classes/Change';
import { Player } from './Player';
import { PlayerChangesVo, PlayerVo } from '../vo/PlayerVo';
import { PlayerName } from './PlayerName';
import { PlayerPassword } from './PlayerPassword';
import { PlayerState } from './PlayerState';
import { PlayerTaboo } from './PlayerTaboo';
import { PlayerWish } from './PlayerWish';

const fields: (keyof PlayerVo | 'pin')[] = ['name', 'wish', 'taboo', 'state', 'pin'];
const changedFields = (changes: PlayerChangesVo) =>
  Object.keys(changes).filter((item) => fields.includes(item as keyof PlayerVo));

type Changes =
  | Change<Player, 'name'>
  | Change<Player, 'wish'>
  | Change<Player, 'taboo'>
  | {
      password: {
        oldValue?: PlayerPassword;
        value: PlayerPassword;
      };
    };

export class PlayerChanges {
  private changes: Changes;

  constructor(changes: PlayerChangesVo) {
    notNull(changes, PLAYER_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), PLAYER_CHANGES_IS_EMPTY);
    this.transform(changes);
  }

  private transform(changes: PlayerChangesVo) {
    this.changes = {
      name: 'name' in changes && {
        value: new PlayerName(changes.name.value),
      },
      wish: 'wish' in changes && {
        value: new PlayerWish(changes.wish.value),
      },
      taboo: 'taboo' in changes && {
        value: new PlayerTaboo(changes.taboo.value),
      },
      password: 'pin' in changes && {
        oldValue: PlayerPassword.createOrNull({ pin: changes.pin.oldValue }),
        value: new PlayerPassword({ pin: changes.pin.newValue }),
      },
    };

    Object.keys(this.changes)
      .filter((key) => !this.changes[key])
      .forEach((key) => delete this.changes[key]);
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
