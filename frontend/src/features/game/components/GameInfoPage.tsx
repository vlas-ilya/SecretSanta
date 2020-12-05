import { GameInfo, GameName, GameState } from 'model/Types';

import Form from 'components/Form/Form';
import FormButton from 'components/FormButton/FormButton';
import FormInput from 'components/FormInput/FormInput';
import FormItem from 'components/FormItem/FormItem';
import { GameChanges } from '../../../model/Game';
import React from 'react';
import Text from 'components/Text/Text';
import { updateGame } from 'features/game/store/game.reducer';

export interface GameInfoProps {
  gameState?: GameState;
  name?: GameName;
  info?: GameInfo;
  change: (changes: GameChanges) => {};
  updateGame: () => {};
  play: () => {};
}

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
        onChange={(value: GameName) => props.change({ field: 'name', value })}
        value={props.name}
      />
    </FormItem>
    <FormItem>
      <FormInput
        name="info"
        disabled={props.gameState === 'RUN'}
        label="Информация об игре"
        onChange={(value: GameInfo) => props.change({ field: 'info', value })}
        value={props.info}
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
      <FormButton onClick={updateGame}>Сохранить</FormButton>
    </div>
  </Form>
);
