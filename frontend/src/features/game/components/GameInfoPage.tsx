import {
  GameChanges,
  GameDescription,
  GameState,
  GameTitle,
} from '../../../../../backend/src/model/GameTypes';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GameInfoProps = {
  gameState?: GameState;
  title?: GameTitle;
  description?: GameDescription;
  change: (changes: GameChanges) => {};
  updateGame: () => {};
  play: () => {};
};

export const GameInfoPage = (props: GameInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игре</Text>
    </FormItem>
    <FormItem>
      <FormInput
        name="name"
        disabled={props.gameState === 'RUN'}
        label="Название игры"
        onChange={(value: GameTitle) => props.change({ field: 'title', value })}
        value={props.title}
      />
    </FormItem>
    <FormItem>
      <FormInput
        name="info"
        disabled={props.gameState === 'RUN'}
        label="Информация об игре"
        onChange={(value: GameDescription) =>
          props.change({ field: 'description', value })
        }
        value={props.description}
      />
    </FormItem>
    <FormItem>
      <Text type="p">
        Если вы тоже планируете участвовать в Тайном Санте, нажмите кнопку «Начать игру»
      </Text>
    </FormItem>
    <div className="actions">
      <FormButton className="grey" onClick={props.play}>
        Участвовать
      </FormButton>
      <FormButton onClick={props.updateGame}>Сохранить</FormButton>
    </div>
  </Form>
);
