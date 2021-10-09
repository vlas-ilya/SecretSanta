import { Id, Pin } from 'model';
import React, { useCallback, useEffect, useState } from 'react';
import {
  selectAuthenticationState,
  selectLoadingStatus,
} from './store/session.selectors';
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
    const authenticationState = useSelector(selectAuthenticationState);
    const loadingStatus = useSelector(selectLoadingStatus);
    const [id, setId] = useState<Id | undefined>(undefined);

    useEffect(() => {
      if (!id) {
        return;
      }
      if (authenticationState === 'SHOULD_CHECK_SESSION') {
        dispatch(checkSession(id));
      } else if (authenticationState === 'SHOULD_LOGIN') {
        dispatch(login(id, undefined));
      }
    }, [id, authenticationState, dispatch]);

    const loginWithPin = useCallback(
      (pin: Pin) => {
        if (id) {
          dispatch(login(id, pin));
        }
      },
      [id, dispatch],
    );

    if (
      authenticationState === 'SHOULD_LOGIN_WITH_PIN' ||
      authenticationState === 'WAS_INCORRECT_PIN'
    ) {
      return (
        <Page loading={loadingStatus.state === 'LOADING'}>
          <InputPinModal
            onInputPin={loginWithPin}
            wasIncorrectPin={authenticationState === 'WAS_INCORRECT_PIN'}
          />
        </Page>
      );
    }

    return (
      <WrappedComponent
        {...(props as T)}
        setId={setId}
        hasSession={authenticationState === 'AUTHENTICATED'}
      />
    );
  };
