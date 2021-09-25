import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import { List } from 'components/List/List';
import { ListItem } from 'components/List/ListItem';
import React from 'react';
import { Text } from 'components/Text/Text';
import { PlayerShortInfo } from '../store/model/PlayerShortInfo';

export type GamePlayersPageProps = {
  players?: PlayerShortInfo[];
};

export const GamePlayersPage = (props: GamePlayersPageProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроках</Text>
    </FormItem>
    <FormItem>
      <List title="Список игроков">
        {props.players?.map((player, index) => (
          <ListItem key={index}>{player.name}</ListItem>
        ))}
      </List>
    </FormItem>
  </Form>
);
