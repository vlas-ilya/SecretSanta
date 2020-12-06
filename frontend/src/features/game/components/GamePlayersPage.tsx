import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import { List } from 'components/List/List';
import { ListItem } from 'components/List/ListItem';
import { PlayerVo } from 'model/PlayerVo';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GamePlayersPageProps = {
  players?: PlayerVo[];
};

export const GamePlayersPage = (props: GamePlayersPageProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроках</Text>
    </FormItem>
    <FormItem>
      <List title="Список игроков">
        {props.players?.map((player) => (
          <ListItem key={player.id}>{player.name}</ListItem>
        ))}
      </List>
    </FormItem>
  </Form>
);
