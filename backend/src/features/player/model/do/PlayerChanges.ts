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
import { PlayerPin } from './PlayerPin';

const fields: (keyof PlayerVo | 'pin')[] = ['name', 'wish', 'taboo', 'state', 'pin'];
const changedFields = (changes: PlayerChangesVo) =>
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

  static async create(changes: PlayerChangesVo): Promise<PlayerChanges> {
    notNull(changes, PLAYER_CHANGES_IS_NULL);
    notEmpty(changedFields(changes), PLAYER_CHANGES_IS_EMPTY);
    const playerChanges = new PlayerChanges();
    playerChanges.changes = await PlayerChanges.transform(changes);
    return playerChanges;
  }

  private static async transform(changesVo: PlayerChangesVo): Promise<Changes> {
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
    if ('pin' in changesVo) {
      (changes as ChangePassword).password = {
        value: await PlayerPassword.create(new PlayerPin(changesVo.pin.newValue)),
        oldValue: changesVo.pin.oldValue && new PlayerPin(changesVo.pin.oldValue),
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
