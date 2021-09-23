import React, { useCallback, useState } from 'react';

import { FormButton } from '../../../components/FormButton/FormButton';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from '../../../components/FormItem/FormItem';
import { GameChangePin } from '../store/model/GameChangePin';
import Modal from '../../../components/Modal/Modal';
import { ValidationError } from '../../../utils/usecase/UseCase';
import { useValidationErrorsTransformer } from '../../../utils/usecase/hooks/useValidationErrorsTransformer';

export type ChangePasswordModalProps = {
  hasPassword: boolean;
  validationError?: ValidationError[];
  onChangeGamePin: (changes: GameChangePin) => void;
  onClose: () => void;
};

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { onChangeGamePin } = props;
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const validationErrors = useValidationErrorsTransformer(props.validationError);

  const changeGamePinCallback = useCallback(() => {
    onChangeGamePin(new GameChangePin(newPin, confirmation, oldPin));
  }, [oldPin, newPin, confirmation, onChangeGamePin]);

  return (
    <Modal
      actions={[
        <FormButton key="close" className="grey" onClick={props.onClose}>
          Отмена
        </FormButton>,
        <FormButton key="change" onClick={changeGamePinCallback}>
          Сохранить
        </FormButton>,
      ]}
      showCloseButton
      onClose={props.onClose}
      title={props.hasPassword ? 'Установка пароля' : 'Смена пароля'}
    >
      {!props.hasPassword && (
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
          validMessage={validationErrors['pin']}
          value={newPin}
          onChange={setNewPin}
        />
      </FormItem>
      <FormItem>
        <FormInput
          name="conformation"
          type="password"
          label="Повторите новый пароль"
          validMessage={validationErrors['conformation']}
          value={confirmation}
          onChange={setConfirmation}
        />
      </FormItem>
    </Modal>
  );
};
