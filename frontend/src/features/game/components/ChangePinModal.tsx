import React, { useCallback, useState } from 'react';

import { FormButton } from '../../../components/FormButton/FormButton';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from '../../../components/FormItem/FormItem';
import { GameChangePin } from '../store/model/GameChangePin';
import Modal from '../../../components/Modal/Modal';

export type ChangePasswordModalProps = {
  hasPassword: boolean;
  validationErrors: Record<string, string>;
  onSetNewPin: (changes: GameChangePin) => void;
  onClose: () => void;
};

export const ChangePinModal = ({
  hasPassword,
  validationErrors,
  onSetNewPin,
  onClose,
}: ChangePasswordModalProps) => {
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const changeGamePinCallback = useCallback(() => {
    onSetNewPin(new GameChangePin(newPin, confirmation, oldPin));
  }, [oldPin, newPin, confirmation, onSetNewPin]);

  return (
    <Modal
      actions={[
        <FormButton key="close" className="grey" onClick={onClose}>
          Отмена
        </FormButton>,
        <FormButton key="change" onClick={changeGamePinCallback}>
          Сохранить
        </FormButton>,
      ]}
      showCloseButton
      onClose={onClose}
      title={hasPassword ? 'Смена пароля' : 'Установка пароля'}
    >
      {hasPassword && (
        <FormItem>
          <FormInput
            name="oldPin"
            type="password"
            label="Введите старый пароль"
            validMessage={validationErrors['oldPin']}
            value={oldPin}
            onChange={setOldPin}
          />
        </FormItem>
      )}
      <FormItem>
        <FormInput
          name="pin"
          type="password"
          label="Введите новый пароль"
          validMessage={validationErrors['newPin']}
          value={newPin}
          onChange={setNewPin}
        />
      </FormItem>
      <FormItem>
        <FormInput
          name="confirmation"
          type="password"
          label="Повторите новый пароль"
          validMessage={validationErrors['confirmation']}
          value={confirmation}
          onChange={setConfirmation}
        />
      </FormItem>
    </Modal>
  );
};
