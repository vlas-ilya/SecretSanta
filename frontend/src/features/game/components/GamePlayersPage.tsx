import Form from '../../../components/Form/Form';
import FormItem from '../../../components/FormItem/FormItem';
import List from '../../../components/List/List';
import ListItem from '../../../components/List/ListItem';
import { Player } from '../../../model/Player';
import React from 'react';
import Text from '../../../components/Text/Text';

export interface GamePlayersPageProps {
  players?: Player[];
}

export const GamePlayersPage = ({ players }: GamePlayersPageProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроках</Text>
    </FormItem>
    <FormItem>
      <List title="Список игроков">
        {players && players.map((player) => <ListItem key={player.id}>{player.name}</ListItem>)}
      </List>
    </FormItem>
  </Form>
);
