import { PlayerName, PlayerTaboo, PlayerWish } from 'model';

import { FieldView } from '../../../components/FieldView/FieldView';
import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type PlayerInfoProps = {
  name?: PlayerName;
  wish?: PlayerWish;
  taboo?: PlayerTaboo;
};

export const TargetInfoSection = ({ name, wish, taboo }: PlayerInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Ваш тайный санта</Text>
    </FormItem>
    <FormItem>
      <FormItem>
        <FieldView name="Имя и Фамилия" value={name} empty={!name} />
      </FormItem>
    </FormItem>
    <FormItem>
      <FieldView name="Пожелания" value={wish} empty={!wish} />
    </FormItem>
    <FormItem>
      <FieldView name="Не дарить ни в коем случае" value={taboo} empty={!taboo} />
    </FormItem>
  </Form>
);
