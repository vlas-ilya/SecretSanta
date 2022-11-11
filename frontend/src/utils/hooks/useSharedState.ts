import { useEffect, useMemo, useRef, useState } from 'react';

interface State<T> {
  state: T;
  setState: (state: T) => void;
  handlers: ((state: T) => void)[];
}

const GLOBAL_STATE = {} as {
  [key: string]: State<any>;
};

export function useSharedState<T>(key: string, initState: T): [T, (nextState: T) => void] {
  const initGlobalState = useMemo<State<T>>(
    () => ({
      state: initState,
      setState: () => {},
      handlers: [],
    }),
    [initState],
  );

  const [state, setState] = useState<State<T>>(initGlobalState);
  const oldSetStateReference = useRef<(value: State<T>) => void>(setState);

  useEffect(() => {
    oldSetStateReference.current = setState;
  }, [oldSetStateReference, setState]);

  useEffect(() => {
    GLOBAL_STATE[key] = GLOBAL_STATE[key] || {
      state: initState,
      setState: (state) => {
        GLOBAL_STATE[key] = { ...GLOBAL_STATE[key], state };
        GLOBAL_STATE[key].handlers.forEach((handler) => handler(GLOBAL_STATE[key]));
      },
      handlers: [],
    };
    setState(GLOBAL_STATE[key]);
    return () => {
      GLOBAL_STATE[key].handlers = [
        ...GLOBAL_STATE[key].handlers.filter((item) => item !== oldSetStateReference.current),
      ];
      if (GLOBAL_STATE[key].handlers.length === 0) {
        delete GLOBAL_STATE[key];
      }
    };
  }, [initState, key]);

  useEffect(() => {
    if (GLOBAL_STATE[key]) {
      GLOBAL_STATE[key].handlers = [
        setState,
        ...GLOBAL_STATE[key].handlers.filter((item) => item !== oldSetStateReference.current),
      ];
      oldSetStateReference.current = setState;
    }
  }, [key, setState]);

  return [state.state, state.setState];
}
