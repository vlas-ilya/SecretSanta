import { List, ListItem, ListItemAction } from '../../../components/List/List';

import { FormButton } from '../../../components/FormButton/FormButton';
import { FormItem } from '../../../components/FormItem/FormItem';
import Modal from '../../../components/Modal/Modal';
import { PlayerShortInfo } from 'model';
import React from 'react';
import { Text } from '../../../components/Text/Text';

export type StartGameModalProps = {
  onClose: () => void;
  onStartGamePressed: () => void;
  players?: PlayerShortInfo[];
};

export function StartGameModal({
  onClose,
  onStartGamePressed,
  players,
}: StartGameModalProps) {
  return (
    <Modal
      actions={[
        <FormButton key="change" onClick={onStartGamePressed}>
          Начать
        </FormButton>,
        <FormButton key="close" className="grey" onClick={onClose}>
          Отмена
        </FormButton>,
      ]}
      showCloseButton
      onClose={onClose}
      title="Начать игру"
    >
      <FormItem>
        <Text type="span">После начала игры новые игроки не смогут добавиться в игру</Text>
      </FormItem>
      <FormItem>
        <Text type="p">Количество игроков: {players?.length ?? 0}</Text>
        <List title="Список игроков" fixed>
          {players?.map((player, index) => (
            <ListItem key={index}>{player.name}</ListItem>
          ))}
          {!players?.length && <ListItem>Еще нет ни одного игрока</ListItem>}
        </List>
      </FormItem>
    </Modal>
  );
}
