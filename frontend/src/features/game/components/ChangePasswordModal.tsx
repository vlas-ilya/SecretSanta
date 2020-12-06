import { ChangeGamePasswordMessageVo } from '../../../model/ChangeGamePasswordMessageVo';
import { FormButton } from '../../../components/FormButton/FormButton';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from '../../../components/FormItem/FormItem';
import Modal from '../../../components/Modal/Modal';
import React from 'react';

export type ChangePasswordModalProps = {
  hasPassword: boolean;
  onClose: () => void;
  changePassword: () => void;
  changePasswordMessage: ChangeGamePasswordMessageVo;
  setChangePasswordMessage: (changePasswordMessage: ChangeGamePasswordMessageVo) => void;
};

export const ChangePasswordModal = (props: ChangePasswordModalProps) => (
  <Modal
    actions={[
      <FormButton key="close" className="grey" onClick={props.onClose}>
        Отмена
      </FormButton>,
      <FormButton key="change" onClick={props.changePassword}>
        Изменить
      </FormButton>,
    ]}
    showCloseButton
    onClose={props.onClose}
    title={props.hasPassword ? 'Установка пароля' : 'Смена пароля'}
  >
    {!props.hasPassword ? (
      <>
        <FormItem>
          <FormInput
            name="password"
            label="Введите пароль"
            value={props.changePasswordMessage.newPassword}
            onChange={(value) =>
              props.setChangePasswordMessage({
                ...props.changePasswordMessage,
                newPassword: value,
              })
            }
          />
        </FormItem>
      </>
    ) : (
      <>
        <FormItem>
          <FormInput
            name="oldPassword"
            label="Введите старый пароль"
            value={props.changePasswordMessage.oldPassword}
            onChange={(value) =>
              props.setChangePasswordMessage({
                ...props.changePasswordMessage,
                oldPassword: value,
              })
            }
          />
        </FormItem>
        <FormItem>
          <FormInput
            name="newPassword"
            label="Введите новый пароль"
            value={props.changePasswordMessage.newPassword}
            onChange={(value) =>
              props.setChangePasswordMessage({
                ...props.changePasswordMessage,
                newPassword: value,
              })
            }
          />
        </FormItem>
        <FormItem>
          <FormInput
            name="confirmPassword"
            label="Повторите новый пароль"
            value={props.changePasswordMessage.confirmNewPassword}
            onChange={(value) =>
              props.setChangePasswordMessage({
                ...props.changePasswordMessage,
                confirmNewPassword: value,
              })
            }
          />
        </FormItem>
      </>
    )}
  </Modal>
);
