import { Operation, Result, ValidationError } from '../UseCase';
import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

export const useUseCaseProcessor = (): [
  ValidationError[],
  (result: Result) => void,
] => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState<ValidationError[]>([]);

  const processResult = useCallback(
    (result: Result) => {
      if (result instanceof Operation) {
        dispatch(result.run());
      } else {
        setValidationError(result);
      }
    },
    [dispatch, setValidationError],
  );

  return [validationError, processResult];
};
