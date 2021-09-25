import { Id, Pin } from './store/model/SessionTypes';
import React, { useCallback, useEffect, useState } from 'react';
import {
  selectHasSession,
  selectLoadingStatus,
  selectShouldInputPin,
  selectWasIncorrectPin,
} from './store/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { InputPinModal } from './components/InputPinModal';
import { Page } from '../../components/Page/Page';
import { checkSession } from './store/useCases/checkSession';
import { login } from './store/useCases/login';

export type AuthenticationProps = {
  setId: (id: Id) => void;
  hasSession?: boolean;
};

export const withAuthentication =
  <T extends AuthenticationProps = AuthenticationProps>(
    WrappedComponent: React.ComponentType<T>,
  ) =>
  (props: Omit<T, keyof AuthenticationProps>) => {
    const dispatch = useDispatch();
    const hasSession = useSelector(selectHasSession);
    const shouldInputPin = useSelector(selectShouldInputPin);
    const loadingStatus = useSelector(selectLoadingStatus);
    const wasIncorrectPin = useSelector(selectWasIncorrectPin);
    const [id, setId] = useState<Id | undefined>(undefined);

    useEffect(() => {
      if (!id) {
        return;
      }
      if (hasSession === undefined) {
        dispatch(checkSession());
      } else if (!hasSession && !shouldInputPin) {
        dispatch(login(id, undefined));
      }
    }, [id, hasSession, shouldInputPin, dispatch]);

    const loginWithPin = useCallback(
      (pin: Pin) => {
        if (id) {
          dispatch(login(id, pin));
        }
      },
      [id, login, dispatch],
    );

    if (!hasSession && shouldInputPin) {
      return (
        <Page loading={loadingStatus.state === 'LOADING'}>
          <InputPinModal
            onInputPin={loginWithPin}
            wasIncorrectPin={wasIncorrectPin}
          />
        </Page>
      );
    }

    return <WrappedComponent {...(props as T)} setId={setId} hasSession={hasSession} />;
  };
