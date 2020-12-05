import { PlayerDontWish, PlayerName, PlayerWish } from '../../../model/Types';

import Form from '../../../components/Form/Form';
import FormButton from '../../../components/FormButton/FormButton';
import FormInput from '../../../components/FormInput/FormInput';
import FormItem from '../../../components/FormItem/FormItem';
import React from 'react';
import Text from '../../../components/Text/Text';
import { Textarea } from '../../../components/Textarea/Textarea';

export interface PlayerInfoProps {
  name?: PlayerName;
  wish?: PlayerWish;
  dontWish?: PlayerDontWish;
  change: (field: string, value: string) => {};
  updatePlayer: () => {};
}

export const PlayerInfo = ({ name, wish, dontWish, change, updatePlayer }: PlayerInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроке</Text>
    </FormItem>
    <FormItem>
      <FormInput
        name="name"
        label="Имя и Фамилия"
        value={name}
        onChange={(value) => change('name', value)}
      />
    </FormItem>
    <FormItem>
      <Textarea
        name="wish"
        label="Пожелания"
        value={wish}
        onChange={(value) => change('wish', value)}
      />
    </FormItem>
    <FormItem>
      <Textarea
        name="dontWish"
        label="Не дарить ни в коем случае"
        value={dontWish}
        onChange={(value) => change('dontWish', value)}
      />
    </FormItem>
    <FormItem>
      <FormButton onClick={updatePlayer}>Сохранить</FormButton>
    </FormItem>
  </Form>
);
