import React, { useEffect } from 'react';
import {
  loadPlayerId,
  selectLoadingState,
  selectPlayerId,
} from 'features/registration/store/registration.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { Redirect } from 'react-router-dom';

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
