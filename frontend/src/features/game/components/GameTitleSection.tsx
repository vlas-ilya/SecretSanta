import { GameState, RegistrationId } from 'model';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GameTitleProps = {
  state?: GameState;
  registrationId?: RegistrationId;
  hasPassword?: boolean;
  onStartGame: () => void;
  onChangePin: () => void;
};

export const GameTitleSection = (props: GameTitleProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Тайный Санта</Text>
    </FormItem>
    {props.state === 'INIT' && (
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
            copied
            label="Ссылка для регистрации"
            value={`${window.location.origin}/api/player/register/${props.registrationId}`}
          />
        </FormItem>
        <FormItem>
          <Text type="p">
            После регистрации всех игроков нажмите кнопку «Начать игру»
          </Text>
          {!props.hasPassword && (
            <Text type="p">Чтобы защитить эту страницу, вы можете установить пароль</Text>
          )}
          <Text type="p">
            Незабудьте созранить ссылку на данную страницу, без нее вы не сможете зайти в
            игру
          </Text>
        </FormItem>
        <div className="actions">
          <FormButton onClick={props.onStartGame}>Начать игру</FormButton>
          <FormButton className="grey" onClick={props.onChangePin}>
            {props.hasPassword ? 'Изменить пин-код' : 'Установить пин-код'}
          </FormButton>
        </div>
      </>
    )}
  </Form>
);
