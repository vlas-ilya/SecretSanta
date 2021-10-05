import { Dispatch } from 'redux';
import { MutableRefObject } from 'react';

export class ValidationError {
  constructor(public field: string, public message: string) {}
}

export class Operation {
  constructor(private method: () => Action) {}

  public run(): Action {
    return this.method();
  }
}

type Validator<T> = (parameter: T) => ValidationError[] | null;
type Action = (dispatch: Dispatch, getState: Function) => Promise<void>;
type Usecase<T> = (parameter: T, callback?: MutableRefObject<() => void>) => Action;
export type Result = ValidationError[] | Operation;

export const usecase =
  <T>(validators: Validator<T>, useCase: Usecase<T>) =>
  (parameter: T, callback?: MutableRefObject<() => void>): Result => {
    if (validators) {
      const errors = validators(parameter);
      if (errors && errors.length > 0) {
        return errors;
      }
    }
    return new Operation(() => useCase(parameter, callback));
  };
