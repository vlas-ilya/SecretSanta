import React, { useCallback } from 'react';
import { selectGameId, selectLoadingStatus } from './store/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormItem } from 'components/FormItem/FormItem';
import { Page } from 'components/Page/Page';
import { Redirect } from 'react-router-dom';
import { Text } from 'components/Text/Text';
import { createGame } from './store/useCases/createGame';

const HomePage = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);
  const gameId = useSelector(selectGameId);

  const onStartGame = useCallback(() => dispatch(createGame()), [dispatch]);

  if (gameId) {
    return <Redirect to={`/game/${gameId}`} />;
  }

  return (
    <Page className="home-page" loading={loadingStatus.state === 'LOADING'}>
      <Form>
        <FormItem>
          <Text type="h1">Тайный Санта</Text>
        </FormItem>
        <FormButton onClick={onStartGame}>Создать игру</FormButton>
      </Form>
    </Page>
  );
};

export default HomePage;
