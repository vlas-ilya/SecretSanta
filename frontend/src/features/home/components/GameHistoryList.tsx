import './GameHistoryList.styles.scss';

import { HistoryGame, HistoryGames } from '../../../utils/hooks/useHistoryGames';
import { List, ListItem, ListItemAction } from '../../../components/List/List';

import { Form } from '../../../components/Form/Form';
import React from 'react';

export type GameHistoryListProps = {
  list: HistoryGames;
  onRemove: (key: string) => void;
  onClick: (link: string) => void;
};

export const GameHistoryList = ({ onRemove, onClick, list }: GameHistoryListProps) => (
  <div className="GameHistoryList">
    {Object.keys(list).length > 0 && (
      <Form>
        <List title="Список созданных игр">
          {Object.entries(list).map(([key, value]) => (
            <ListItem
              key={key}
              onClick={() =>
                onClick(`${value.type == 'Game' ? 'game' : 'player'}/${key}`)
              }
            >
              <GameHistoryItem item={value} />
              <ListItemAction title="Удалить" action={() => onRemove(key)} />
            </ListItem>
          ))}
        </List>
      </Form>
    )}
  </div>
);

type GameHistoryItemProps = {
  item: HistoryGame;
};

const GameHistoryItem = ({
  item: { type, gameName, playerName, playerCount },
}: GameHistoryItemProps) => (
  <div>
    {type == 'Game'
      ? `Игра: ${gameName ?? 'Нет названия'}, Количество игроков: ${playerCount ?? 0}`
      : `Игра: ${gameName ?? 'Нет названия'}, Игрок: ${playerName ?? 'Нет имени'}`}
  </div>
);
