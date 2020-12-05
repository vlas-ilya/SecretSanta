import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { selectGameId, selectLoadingState, startGame } from './store/home.reducer';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import FormItem from '../../components/FormItem/FormItem';
import Page from '../../components/Page/Page';
import Text from '../../components/Text/Text';

const HomePage = () => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const gameId = useSelector(selectGameId);

  const onStartGame = useCallback(() => dispatch(startGame()), [dispatch]);

  if (gameId) {
    return <Redirect to={`/game/${gameId}`}/>;
  }

  return (
    <Page className="home-page" loading={loadingState === 'LOADING'}>
      <Form>
        <FormItem>
          <Text type="h1">Тайный санта</Text>
        </FormItem>
        <FormButton onClick={onStartGame}>Создать игру</FormButton>
      </Form>
    </Page>
  );
};

export default HomePage;
