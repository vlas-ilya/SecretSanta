import Page from '../../components/Page/Page';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlayerId, selectLoadingState, selectPlayerId } from './store/registration.reducer';
import { Redirect } from 'react-router-dom';

const RegistrationPage = ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const playerId = useSelector(selectPlayerId);

  useEffect(() => {
    dispatch(loadPlayerId(match.params.id));
  }, [dispatch, match.params.id]);

  if (playerId) {
    return <Redirect to={`/player/${playerId}`}/>;
  }

  return <Page className="registration-page" loading={loadingState === 'LOADING'}>.!..</Page>;
};

export default RegistrationPage;
