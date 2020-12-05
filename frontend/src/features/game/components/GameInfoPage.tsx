import { GameInfo, GameName, GameState } from '../../../model/Types';
import { updateGame } from '../store/game.reducer';

import Form from '../../../components/Form/Form';
import FormButton from '../../../components/FormButton/FormButton';
import FormInput from '../../../components/FormInput/FormInput';
import FormItem from '../../../components/FormItem/FormItem';
import React from 'react';
import Text from '../../../components/Text/Text';

export interface GameInfoProps {
  gameState?: GameState;
  name?: GameName;
  info?: GameInfo;
  changeName: (value: string) => {};
  changeGameInfo: (value: string) => {};
  updateGame: () => {};
  play: () => {};
}

export const GameInfoPage = ({ gameState, name, changeName, info, changeGameInfo, play }: GameInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игре</Text>
    </FormItem>
    <FormItem>
      <FormInput name="name" disabled={gameState === 'RUN'} label="Название игры" onChange={changeName} value={name} />
    </FormItem>
    <FormItem>
      <FormInput
        name="info"
        disabled={gameState === 'RUN'}
        label="Информация об игре"
        onChange={changeGameInfo}
        value={info}
      />
    </FormItem>
    <FormItem>
      <Text type="p">Если вы тоже планируете участвовать в Тайном Санте, нажмите кнопку «Начать игру»</Text>
    </FormItem>
    <div className="actions">
      <FormButton className="grey" onClick={play}>
        Участвовать
      </FormButton>
      <FormButton onClick={updateGame}>Сохранить</FormButton>
    </div>
  </Form>
);
