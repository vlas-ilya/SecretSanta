export type Change<Type, property extends keyof Type> = {
  [Property in keyof Type as Exclude<property, Type>]: {
    value: Type[property];
  };
};
