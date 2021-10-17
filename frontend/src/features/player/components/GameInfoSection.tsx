import { FieldView } from '../../../components/FieldView/FieldView';
import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import { GameShortInfo } from 'model';
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
      <FieldView
        name="Название игры"
        value={props.game.title}
        empty={!props.game.title}
      />
    </FormItem>
    <FormItem>
      <FieldView
        name="Описание игры"
        value={props.game.description}
        empty={!props.game.description}
      />
    </FormItem>
    <FormItem>
      <FieldView
        name="Статус игры"
        value={props.game.state === 'INIT' ? 'Подготовка игроков' : 'Запущена'}
      />
    </FormItem>
  </Form>
);
