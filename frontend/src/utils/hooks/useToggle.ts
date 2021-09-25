import { useCallback, useState } from 'react';

export const useToggle = (): [boolean, () => void, () => void] => {
  const [show, setShow] = useState(false);

  const setTrue = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const setFalse = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return [show, setTrue, setFalse];
};
