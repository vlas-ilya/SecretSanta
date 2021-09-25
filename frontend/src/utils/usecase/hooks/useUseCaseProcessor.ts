import { Operation, Result, ValidationError } from '../UseCase';
import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useValidationErrorsTransformer } from './useValidationErrorsTransformer';

export const useUseCaseProcessor = (): [
  Record<string, string>,
  (result: Result) => void,
  () => void,
] => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState<ValidationError[]>([]);

  const processResult = useCallback(
    (result: Result) => {
      if (result instanceof Operation) {
        setValidationError([]);
        dispatch(result.run());
      } else {
        setValidationError(result);
      }
    },
    [dispatch, setValidationError],
  );

  const clearValidationErrors = useCallback(() => {
    setValidationError([]);
  }, [setValidationError]);

  const errors = useValidationErrorsTransformer(validationError);

  return [errors, processResult, clearValidationErrors];
};
