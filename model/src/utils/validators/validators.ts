import { isArray } from './typechecker/isArray';
import { isDefined } from './common/isDefined';

export type Maybe<T> = T | undefined;
export type ValidationMessage = string;
export type ValidationError<O> = {
  field: keyof O;
  message: ValidationMessage;
};

export type Checker = (condition: boolean, validationMessage: ValidationMessage) => void;

export type FieldValidator<R> = (
  value: any,
  check: Checker,
  transform: (result: R) => void,
) => void;

export type ValidateResult<O> = [Maybe<O>, ValidationError<O>[]];

const getChecker = (): [Checker, ValidationMessage[]] => {
  let firstError = true;
  const validationMessages = [] as ValidationMessage[];

  const check: Checker = (condition, message) => {
    if (firstError && !condition) {
      validationMessages.push(message);
      firstError = false;
    }
  };

  return [check, validationMessages];
};

type Getter<T> = () => T;
type Setter<T> = (value: T) => void;
const getResult = <T>(value: any): [Getter<T>, Setter<T>] => {
  const initValue = value;
  let result: T;

  const getter = (): T => {
    return result ?? (initValue as T);
  };

  const setter = (value: T) => {
    result = value;
  };

  return [getter, setter];
};

const mapValidationErrors = <O, K extends keyof O>(
  field: K,
  validationMessages: ValidationMessage[],
): ValidationError<O>[] =>
  validationMessages.map((message) => ({
    field,
    message,
  }));

export const isValidNested = <T>(
  value: any,
  transformer: (value: any) => ValidateResult<T>,
): [T | undefined, boolean] => {
  const [x, errors] = transformer(value);
  if (errors.length > 0 || !x) {
    return [undefined, false];
  }
  return [x, true];
};

export const isValidNestedArray = <T>(
  value: any[],
  transformer: (value: any) => ValidateResult<T>,
): [T[] | undefined, boolean] => {
  if (!isArray(value)) {
    return [undefined, false];
  }
  const result = [] as T[];
  for (let item of value) {
    const [x, errors] = transformer(item);
    if (errors.length > 0 || !x) {
      return [undefined, false];
    }
    result.push(x);
  }
  return [result, true];
};

type Required<O> = <K extends keyof O>(
  field: K,
  checker: FieldValidator<O[K]>,
) => Validator<O>;

type RequiredIf<O> = <K extends keyof O>(
  field: K,
  condition: boolean,
  checker: FieldValidator<O[K]>,
) => Validator<O>;

type Optional<O> = <K extends keyof O>(
  field: K,
  checker: FieldValidator<O[K]>,
) => Validator<O>;

type TryToCreate<O> = (transformer: (value: O) => O) => ValidateResult<O>;

export type Validator<O> = {
  required: Required<O>;
  requiredIf: RequiredIf<O>;
  optional: Optional<O>;
  tryToCreate: TryToCreate<O>;
};

export const validate = <O>(object: any): Validator<O> => {
  const validationErrors = [] as ValidationError<O>[];
  const resultObject = {} as O;

  const result = {
    required: <K extends keyof O>(
      field: K,
      validate: FieldValidator<O[K]>,
    ): Validator<O> => {
      const value = object[field] as any;
      const [check, validationMessages] = getChecker();
      const [getter, setter] = getResult<O[K]>(value);

      validate(value, check, setter);
      validationErrors.push(...mapValidationErrors<O, K>(field, validationMessages));
      resultObject[field] = getter();
      return result;
    },

    requiredIf: <K extends keyof O>(
      field: K,
      condition: boolean,
      validate: FieldValidator<O[K]>,
    ): Validator<O> => {
      const value = object[field] as any;
      const [check, validationMessages] = getChecker();
      const [getter, setter] = getResult<O[K]>(value);

      if (condition) {
        validate(value, check, setter);
        validationErrors.push(...mapValidationErrors<O, K>(field, validationMessages));
        resultObject[field] = getter();
      }
      return result;
    },

    optional: <K extends keyof O>(
      field: K,
      validate: FieldValidator<O[K]>,
    ): Validator<O> => {
      const value = object[field] as any;
      const [check, validationMessages] = getChecker();
      const [getter, setter] = getResult<O[K]>(value);

      if (isDefined(value)) {
        validate(value, check, setter);
        validationErrors.push(...mapValidationErrors<O, K>(field, validationMessages));
        resultObject[field] = getter();
      }
      return result;
    },

    tryToCreate: (transformer: (value: O) => O): ValidateResult<O> => {
      return validationErrors.length === 0
        ? [transformer(resultObject), []]
        : [undefined, validationErrors];
    },
  };

  return result;
};
