import React, { useEffect } from 'react';
import { Redirect, match } from 'react-router-dom';
import { loadPlayerId, selectLoadingState, selectPlayerId } from './store/registration.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { MatchIdentifiable } from '../../model/Types';
import Page from '../../components/Page/Page';

const RegistrationPage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const playerId = useSelector(selectPlayerId);

  useEffect(() => {
    dispatch(loadPlayerId(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (playerId) {
    return <Redirect to={`/player/${playerId}`} />;
  }

  return <Page className="registration-page" loading={loadingState === 'LOADING'} />;
};

export default RegistrationPage;
