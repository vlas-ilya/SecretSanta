import React, { useState } from 'react';

import { FormButton } from '../../../components/FormButton/FormButton';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from '../../../components/FormItem/FormItem';
import { GamePassword } from '../../../../../backend/src/model/GameTypes';
import Modal from '../../../components/Modal/Modal';
import { Text } from '../../../components/Text/Text';

export type InputPasswordModal = {
  onInputPassword: (password: GamePassword) => void;
};

export const InputPasswordModal = (props: InputPasswordModal) => {
  const [password, setPassword] = useState('');
  return (
    <Modal
      title="Введите пароль"
      showCloseButton={false}
      onClose={() => {}}
      actions={
        <FormButton key="change" onClick={() => props.onInputPassword(password)}>
          Сохранить
        </FormButton>
      }
    >
      <FormItem>
        <Text type="p">Для продолжения работы введите пароль</Text>
      </FormItem>
      <FormItem>
        <FormItem>
          <FormInput
            name="password"
            type="password"
            label="Введите пароль"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </FormItem>
      </FormItem>
    </Modal>
  );
};
