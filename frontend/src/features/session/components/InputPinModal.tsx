import React, { useCallback, useState } from 'react';

import { FormButton } from '../../../components/FormButton/FormButton';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from '../../../components/FormItem/FormItem';
import Modal from '../../../components/Modal/Modal';
import { GAME_CHANGE_PIN_MAX_LENGTH, Pin } from 'model';
import { Text } from '../../../components/Text/Text';

export type InputPasswordModal = {
  onInputPin: (password: Pin) => void;
  wasIncorrectPin?: boolean;
};

export const InputPinModal = ({ onInputPin, wasIncorrectPin }: InputPasswordModal) => {
  const [pin, setPin] = useState('');

  const onLogin = useCallback(() => {
    onInputPin(pin);
  }, [pin, onInputPin]);

  return (
    <Modal
      title="Введите пин-код"
      showCloseButton={false}
      onClose={() => {}}
      actions={
        <FormButton key="change" onClick={onLogin}>
          Войти
        </FormButton>
      }
    >
      <FormItem>
        <Text type="p">Для продолжения работы введите пин-код</Text>
      </FormItem>
      <FormItem>
        <FormItem>
          <FormInput
            name="pin"
            type="password"
            digits
            maxLength={GAME_CHANGE_PIN_MAX_LENGTH}
            label="Введите пин-код"
            validMessage={wasIncorrectPin ? 'Некорректный пин-код' : ''}
            value={pin}
            onChange={setPin}
            onEnter={onLogin}
          />
        </FormItem>
      </FormItem>
    </Modal>
  );
};
