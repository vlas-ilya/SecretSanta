import { Id, Pin } from 'model';
import React, { useCallback, useEffect, useState } from 'react';
import { selectAuthenticationState, selectLoadingStatus } from './store/session.selectors';
import { useDispatch, useSelector } from 'react-redux';

import { AuthenticationErrorModal } from './components/AuthenticationErrorModal';
import { InputPinModal } from './components/InputPinModal';
import { Page } from '../../components/Page/Page';
import { checkSession } from './store/useCases/checkSession';
import { login } from './store/useCases/login';
import { useHistory } from 'react-router-dom';

export type AuthenticationProps = {
  setId: (id: Id) => void;
  hasSession?: boolean;
};

let oldDocumentHidden = false;

export const withAuthentication =
  <T extends AuthenticationProps = AuthenticationProps>(
    WrappedComponent: React.ComponentType<T>,
  ) =>
  (props: Omit<T, keyof AuthenticationProps>) => {
    const dispatch = useDispatch();
    const authenticationState = useSelector(selectAuthenticationState);
    const loadingStatus = useSelector(selectLoadingStatus);
    const [id, setId] = useState<Id | undefined>(undefined);
    const history = useHistory();

    useEffect(() => {
      if (!id) {
        return;
      }
      const event = () => {
        if (oldDocumentHidden && !document.hidden) {
          dispatch(checkSession(id));
        }
        oldDocumentHidden = document.hidden;
      };
      window.addEventListener('visibilitychange', event);
      return () => window.removeEventListener('visibilitychange', event);
    }, [dispatch, id]);

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

    if (authenticationState == 'UNKNOWN_ERROR') {
      return (
        <Page loading={loadingStatus.state === 'LOADING'}>
          <AuthenticationErrorModal
            message="Произошла неизвестная ошибка"
            goHome={() => history.push('/')}
          />
        </Page>
      );
    }

    if (authenticationState == 'NOT_FOUND') {
      return (
        <Page loading={loadingStatus.state === 'LOADING'}>
          <AuthenticationErrorModal
            goHome={() => history.push('/')}
            message={
              // @ts-ignore
              props?.match?.path === '/player/:id'
                ? 'Игрок не найден'
                : 'Игра не найдена'
            }
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
