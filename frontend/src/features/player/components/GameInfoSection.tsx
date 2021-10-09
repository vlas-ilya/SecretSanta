import { Form } from 'components/Form/Form';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import { GameShortInfo } from '../store/model/GameShortInfo';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GameInfoProps = {
  game: GameShortInfo;
};

export const GameInfoSection = (props: GameInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игре</Text>
    </FormItem>
    <FormItem>
      <FormInput
        name="title"
        label="Название игры"
        value={props.game.title || 'Нет информации'}
        disabled
      />
    </FormItem>
    <FormItem>
      <FormInput
        name="description"
        label="Информация об игре"
        value={props.game.description || 'Нет информации'}
        disabled
      />
    </FormItem>
    <FormItem>
      <FormInput
        name="state"
        label="Статус игры"
        value={props.game.state === 'INIT' ? 'Подготовка игроков' : 'Запущена'}
        disabled
      />
    </FormItem>
  </Form>
);
