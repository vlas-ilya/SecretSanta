import { FormButton } from '../../../components/FormButton/FormButton';
import Modal from '../../../components/Modal/Modal';
import React from 'react';

export type AuthenticationErrorModalType = {
  message: string;
  goHome: () => void;
};

export function AuthenticationErrorModal({
  message,
  goHome,
}: AuthenticationErrorModalType) {
  return (
    <Modal
      actions={[
        <FormButton key="change" onClick={goHome}>
          На главную
        </FormButton>,
      ]}
      onClose={() => {}}
      title={message}
    >
      {}
    </Modal>
  );
}
