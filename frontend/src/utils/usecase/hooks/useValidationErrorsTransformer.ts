import { ValidationError } from '../UseCase';
import { useMemo } from 'react';

export const useValidationErrorsTransformer = (
  validationError?: ValidationError[],
): Record<string, string> => {
  return useMemo(() => {
    return (
      validationError?.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>) || {}
    );
  }, [validationError]);
};
