import { GamePassword } from '../../../../../backend/src/model/GameTypes';
import { FormButton } from '../../../components/FormButton/FormButton';
import Modal from '../../../components/Modal/Modal';
import React, { useState } from 'react';
import { FormItem } from '../../../components/FormItem/FormItem';
import { Text } from '../../../components/Text/Text';
import { FormInput } from '../../../components/FormInput/FormInput';

export type InputPasswordModal = {
  onInputPassword: (password: GamePassword) => void
}

export const InputPasswordModal = (props: InputPasswordModal) => {
  const [password, setPassword] = useState("");
  return (
    <Modal
      title="Введите пароль"
      showCloseButton={false}
      onClose={() => {}}
      actions={
        <FormButton key="change" onClick={() => props.onInputPassword(password)}>
          Сохранить
        </FormButton>
      }>
      <FormItem>
        <Text type="p">Для продолжения работы введите пароль</Text>
      </FormItem>
      <FormItem>
        <FormItem>
          <FormInput
            name="password"
            label="Введите пароль"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </FormItem>
      </FormItem>
    </Modal>
  )
}