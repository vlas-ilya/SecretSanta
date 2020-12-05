import Form from '../../../components/Form/Form';
import FormButton from '../../../components/FormButton/FormButton';
import FormInput from '../../../components/FormInput/FormInput';
import FormItem from '../../../components/FormItem/FormItem';
import React from 'react';
import { GameState, RegistrationId } from '../../../model/Types';
import Text from '../../../components/Text/Text';

export interface GameTitleProps {
  gameState?: GameState
  registrationId?: RegistrationId;
  startGame: () => void;
}

export const GameTitlePage = ({ registrationId, startGame, gameState }: GameTitleProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Тайный санта</Text>
    </FormItem>
    { gameState === 'INIT' &&
      <>
        <FormItem>
          <Text type="p">Отправьте эту ссылку игрокам и дождитесь, когда все игроки зарегистрируются</Text>
        </FormItem>
        <FormItem>
          <FormInput
            name="registrationId"
            readOnly
            label="Ссылка для регистрации"
            value={`${window.location.origin}/player/registration/${registrationId}`}
          />
        </FormItem>
        <FormItem>
          <Text type="p">После регистрации всех игроков нажмите кнопку «Начать игру»</Text>
        </FormItem>
        <FormButton onClick={startGame}>Начать игру</FormButton>
      </>
    }

  </Form>
);
