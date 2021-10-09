import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import { List } from 'components/List/List';
import { ListItem } from 'components/List/ListItem';
import { PlayerShortInfo } from 'model';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GamePlayersPageProps = {
  players?: PlayerShortInfo[];
};

export const GamePlayersSection = (props: GamePlayersPageProps) => (
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
