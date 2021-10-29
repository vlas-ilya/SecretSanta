import { List, ListItem, ListItemAction } from 'components/List/List';
import { PlayerId, PlayerShortInfo } from 'model';

import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GamePlayersPageProps = {
  players?: PlayerShortInfo[];
  onRemovePlayer: (id: PlayerId) => void;
};

export const GamePlayersSection = (props: GamePlayersPageProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроках</Text>
    </FormItem>
    <FormItem>
      <List title="Список игроков">
        {props.players?.map((player, index) => (
          <ListItem key={index}>
            {player.name}
            <ListItemAction
              title="Удалить"
              action={() => props.onRemovePlayer(player.publicId)}
            />
          </ListItem>
        ))}
        {!props.players?.length && <ListItem>Еще нет ни одного игрока</ListItem>}
      </List>
    </FormItem>
  </Form>
);
