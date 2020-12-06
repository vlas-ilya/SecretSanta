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
import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { GameChanges } from '../../../../backend/src/model/GameTypes';

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
        title={game?.title}
        description={game?.description}
        change={(changes: GameChanges) => dispatch(changeGame(changes))}
        updateGame={() => dispatch(updateGame())}
        play={() => 2 + 2}
      />
      <GamePlayersPage players={game?.players} />
    </Page>
  );
};

export default GamePage;
