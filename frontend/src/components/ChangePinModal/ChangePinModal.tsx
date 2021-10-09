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
  makeChanges: (newPin: string, confirmation: string, oldPin: string) => T;
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
    onSetNewPin(makeChanges(newPin, confirmation, oldPin));
  }, [oldPin, newPin, confirmation, onSetNewPin, makeChanges]);

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
      title={hasPassword ? 'Смена пин-кода' : 'Установка пин-кода'}
    >
      {hasPassword && (
        <FormItem>
          {/* TODO (feat): Сделать цифровую клавиатуру для мобильного телефона */}
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
        {/* TODO (feat): Сделать цифровую клавиатуру для мобильного телефона */}
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
        {/* TODO (feat): Сделать цифровую клавиатуру */}
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
