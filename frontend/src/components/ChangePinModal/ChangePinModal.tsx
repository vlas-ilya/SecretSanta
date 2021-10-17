import React, { useCallback, useState } from 'react';

import { FormButton } from '../FormButton/FormButton';
import { FormInput } from '../FormInput/FormInput';
import { FormItem } from '../FormItem/FormItem';
import Modal from '../Modal/Modal';

export type ChangePinModalProps<T> = {
  hasPassword: boolean;
  validationErrors: Record<string, string>;
  onSetNewPin: (changes: T) => void;
  onClose: () => void;
  makeChanges: (
    newPin: string,
    confirmation: string,
    oldPin: string,
    hasPassword: boolean,
  ) => T;
  maxLength: number;
};

export function ChangePinModal<T>({
  hasPassword,
  validationErrors,
  onSetNewPin,
  onClose,
  makeChanges,
  maxLength,
}: ChangePinModalProps<T>) {
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const changeGamePinCallback = useCallback(() => {
    onSetNewPin(makeChanges(newPin, confirmation, oldPin, hasPassword));
  }, [oldPin, newPin, confirmation, hasPassword, onSetNewPin, makeChanges]);

  return (
    <Modal
      actions={[
        <FormButton key="change" onClick={changeGamePinCallback}>
          Сохранить
        </FormButton>,
        <FormButton key="close" className="grey" onClick={onClose}>
          Отмена
        </FormButton>,
      ]}
      showCloseButton
      onClose={onClose}
      title={hasPassword ? 'Изменение пин-кода' : 'Установка пин-кода'}
    >
      {hasPassword && (
        <FormItem>
          <FormInput
            digits
            name="oldPin"
            type="password"
            label="Введите старый пин-код"
            validMessage={validationErrors['oldPin']}
            value={oldPin}
            onChange={setOldPin}
            maxLength={maxLength}
          />
        </FormItem>
      )}
      <FormItem>
        <FormInput
          digits
          name="pin"
          type="password"
          label="Введите новый пин-код"
          validMessage={validationErrors['newPin']}
          value={newPin}
          onChange={setNewPin}
          maxLength={maxLength}
        />
      </FormItem>
      <FormItem>
        <FormInput
          digits
          name="confirmation"
          type="password"
          label="Повторите новый пин-код"
          validMessage={validationErrors['confirmation']}
          value={confirmation}
          onChange={setConfirmation}
          maxLength={maxLength}
        />
      </FormItem>
    </Modal>
  );
}
