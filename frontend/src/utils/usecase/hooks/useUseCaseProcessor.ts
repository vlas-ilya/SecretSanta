import { Operation, Result, ValidationError } from '../usecase';
import { useCallback, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

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

  const errors = useMemo(() => {
    return (
      validationError?.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>) || {}
    );
  }, [validationError]);

  return [errors, processResult, clearValidationErrors];
};
