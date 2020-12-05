import React, { useEffect } from 'react';
import {
  changeGame,
  loadGameInfo,
  selectGame,
  selectLoadingState,
  startGame,
  updateGame,
} from './store/game.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { GameInfoPage } from './components/GameInfoPage';
import { GamePlayersPage } from './components/GamePlayersPage';
import { GameTitlePage } from './components/GameTitlePage';
import Page from '../../components/Page/Page';

const GamePage = ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const game = useSelector(selectGame);

  useEffect(() => {
    dispatch(loadGameInfo(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Page className="game-page" loading={loadingState === 'LOADING'}>
      <GameTitlePage
        gameState={game?.gameState}
        registrationId={game?.registrationId}
        startGame={() => dispatch(startGame())}
      />
      <GameInfoPage
        gameState={game?.gameState}
        name={game?.name}
        info={game?.info}
        changeName={(value) => dispatch(changeGame({ field: 'name', value }))}
        changeGameInfo={(value) => dispatch(changeGame({ field: 'info', value }))}
        updateGame={() => dispatch(updateGame())}
        play={() => 2 + 2}
      />
      <GamePlayersPage players={game?.players}/>
    </Page>
  );
};

export default GamePage;
