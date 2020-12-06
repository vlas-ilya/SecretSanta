import {
  PlayerChanges,
  PlayerName,
  PlayerTaboo,
  PlayerWish,
} from '../../../../../backend/src/model/PlayerTypes';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';
import { Textarea } from 'components/Textarea/Textarea';

export type PlayerInfoProps = {
  name?: PlayerName;
  wish?: PlayerWish;
  taboo?: PlayerTaboo;
  change: (changes: PlayerChanges) => {};
  changePassword: () => void;
  updatePlayer: () => {};
};

export const PlayerInfo = (props: PlayerInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроке</Text>
    </FormItem>
    <FormItem>
      <FormInput
        name="name"
        label="Имя и Фамилия"
        value={props.name}
        onChange={(value) => props.change({ field: 'name', value })}
      />
    </FormItem>
    <FormItem>
      <Textarea
        name="wish"
        label="Пожелания"
        value={props.wish}
        onChange={(value) => props.change({ field: 'wish', value })}
      />
    </FormItem>
    <FormItem>
      <Textarea
        name="dontWish"
        label="Не дарить ни в коем случае"
        value={props.taboo}
        onChange={(value) => props.change({ field: 'taboo', value })}
      />
    </FormItem>
    <div className="actions">
      <FormButton className="grey" onClick={props.changePassword}>
        Установить пароль
      </FormButton>
      <FormButton onClick={props.updatePlayer}>Сохранить</FormButton>
    </div>
    <FormItem>
      <Text type="p">Чтобы защитить эту страницу, вы можете установить пароль</Text>
    </FormItem>
  </Form>
);
