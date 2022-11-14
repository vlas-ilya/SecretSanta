import React, { useCallback, useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { selectGameId, selectLoadingStatus } from './store/home.selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormItem } from 'components/FormItem/FormItem';
import { GameHistoryList } from './components/GameHistoryList/GameHistoryList';
import { Page } from 'components/Page/Page';
import { Text } from 'components/Text/Text';
import { createGame } from './store/useCases/createGame';
import { useHistoryGames } from '../../utils/hooks/useHistoryGames';
import { changeAuthenticationState } from '../session/store/session.reducer';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loadingStatus = useSelector(selectLoadingStatus);
  const gameId = useSelector(selectGameId);
  const { list, removeItem } = useHistoryGames();

  const historyGameList = useMemo(() => list(), [list]);

  const onStartGame = useCallback(() => dispatch(createGame()), [dispatch]);

  useEffect(() => {
    dispatch(changeAuthenticationState('SHOULD_CHECK_SESSION'));
  }, [dispatch])

  const onHistoryGameListItemClick = useCallback((link: string) => {
    history.push(link);
  }, []);

  const onHistoryGameListRemoveItemClick = useCallback(
    (key: string) => {
      removeItem(key);
    },
    [removeItem],
  );

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
      <GameHistoryList
        list={historyGameList}
        onClick={onHistoryGameListItemClick}
        onRemove={onHistoryGameListRemoveItemClick}
      />
    </Page>
  );
};

export default HomePage;
