import { useEffect, useMemo, useRef, useState } from 'react';

interface State<T> {
  state: T;
  setState: (state: T) => void;
  handlers: ((state: T) => void)[];
}

interface GlobalState {
  [key: string]: State<any>;
}

const globalState: GlobalState = {};

export function useSharedState<T>(name: string, initState: T): [T, (state: T) => void] {
  const initGlobalState = useMemo<State<T>>(
    () => ({
      state: initState,
      setState: () => {},
      handlers: [],
    }),
    [initState],
  );

  const [state, setState] = useState<State<T>>(initGlobalState);
  const oldSetState = useRef<(value: State<T>) => void>(setState);

  useEffect(() => {
    globalState[name] = globalState[name] || {
      state: initState,
      setState: (state) => {
        globalState[name] = { ...globalState[name], state };
        globalState[name].handlers.forEach((handler) => handler(globalState[name]));
      },
      handlers: [],
    };
    setState(globalState[name]);
    return () => {
      globalState[name].handlers = [
        ...globalState[name].handlers.filter((item) => item !== oldSetState.current),
      ];
      if (globalState[name].handlers.length === 0) {
        delete globalState[name];
      }
    };
  }, [initState, name]);

  useEffect(() => {
    if (globalState[name]) {
      globalState[name].handlers = [
        setState,
        ...globalState[name].handlers.filter((item) => item !== oldSetState.current),
      ];
      oldSetState.current = setState;
    }
  }, [name, setState]);

  return [state.state, state.setState];
}
