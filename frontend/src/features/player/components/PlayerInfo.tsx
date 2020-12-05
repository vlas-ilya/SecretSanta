import { PlayerDontWish, PlayerName, PlayerWish } from 'model/Types';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import { PlayerChanges } from 'model/Player';
import React from 'react';
import { Text } from 'components/Text/Text';
import { Textarea } from 'components/Textarea/Textarea';

export type PlayerInfoProps = {
  name?: PlayerName;
  wish?: PlayerWish;
  dontWish?: PlayerDontWish;
  change: (changes: PlayerChanges) => {};
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
        value={props.dontWish}
        onChange={(value) => props.change({ field: 'dontWish', value })}
      />
    </FormItem>
    <FormItem>
      <FormButton onClick={props.updatePlayer}>Сохранить</FormButton>
    </FormItem>
  </Form>
);
