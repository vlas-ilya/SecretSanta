import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GameId } from '../game/store/model/GameTypes';
import { PlayerId } from '../player/store/model/PlayerTypes';
import { checkSession } from './store/useCases/checkSession';
import { login } from './store/useCases/login';
import { selectHasSession } from './store/selectors';

export type AuthenticationProps = {
  setId: (id: GameId | PlayerId) => void;
  hasSession?: boolean;
};

export const withAuthentication =
  <T extends AuthenticationProps = AuthenticationProps>(
    WrappedComponent: React.ComponentType<T>,
  ) =>
  (props: Omit<T, keyof AuthenticationProps>) => {
    const dispatch = useDispatch();
    const hasSession = useSelector(selectHasSession);
    const [id, setId] = useState<GameId | PlayerId | undefined>(undefined);

    useEffect(() => {
      if (!id) {
        return;
      }
      if (hasSession === undefined) {
        dispatch(checkSession());
      } else if (!hasSession) {
        dispatch(login(id, undefined));
      }
    }, [hasSession, dispatch, id]);

    return <WrappedComponent {...(props as T)} setId={setId} hasSession={hasSession} />;
  };
