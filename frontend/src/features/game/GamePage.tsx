import React, { useEffect } from 'react';
import {
  changeGame,
  loadGameInfo,
  selectGame,
  selectLoadingState,
  startGame,
  updateGame,
} from 'features/game/store/game.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { GameInfoPage } from 'features/game/components/GameInfoPage';
import { GamePlayersPage } from 'features/game/components/GamePlayersPage';
import { GameTitlePage } from 'features/game/components/GameTitlePage';
import { MatchIdentifiable } from 'model/Types';
import Page from 'components/Page/Page';

const GamePage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const game = useSelector(selectGame);

  useEffect(() => {
    dispatch(loadGameInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

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
      <GamePlayersPage players={game?.players} />
    </Page>
  );
};

export default GamePage;
