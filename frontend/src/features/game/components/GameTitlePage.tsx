import { GameState, RegistrationId } from '../../../../../backend/src/model/GameTypes';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GameTitleProps = {
  gameState?: GameState;
  registrationId?: RegistrationId;
  startGame: () => void;
  changePassword: () => void;
};

export const GameTitlePage = (props: GameTitleProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Тайный санта</Text>
    </FormItem>
    {props.gameState === 'INIT' && (
      <>
        <FormItem>
          <Text type="p">
            Отправьте эту ссылку игрокам и дождитесь, когда все игроки зарегистрируются
          </Text>
        </FormItem>
        <FormItem>
          <FormInput
            name="registrationId"
            readOnly
            label="Ссылка для регистрации"
            // TODO: сделать копирование ссылки
            value={`${window.location.origin}/player/registration/${props.registrationId}`}
          />
        </FormItem>
        <FormItem>
          <Text type="p">После регистрации всех игроков нажмите кнопку «Начать игру»</Text>
        </FormItem>
        <div className="actions">
          <FormButton className="grey" onClick={props.changePassword}>
            Установить пароль
          </FormButton>
          <FormButton onClick={props.startGame}>Начать игру</FormButton>
        </div>
        <FormItem>
          <Text type="p">Чтобы защитить эту страницу, вы можете установить пароль</Text>
        </FormItem>
      </>
    )}
  </Form>
);
