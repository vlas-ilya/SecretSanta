import { useCallback, useState } from 'react';

export const useToggle = (): [boolean, () => void, () => void] => {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const hideModal = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return [show, showModal, hideModal];
};
