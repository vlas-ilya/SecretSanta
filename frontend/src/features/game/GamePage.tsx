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

import { GameChanges } from '../../../../backend/src/model/GameTypes';
import { GameInfoPage } from 'features/game/components/GameInfoPage';
import { GamePlayersPage } from 'features/game/components/GamePlayersPage';
import { GameTitlePage } from 'features/game/components/GameTitlePage';
import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';

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
        changePassword={() => {}}
        // TODO: реализовать установку / смену паролья
        // TODO: реализовать ввод паролья для логина, если он установлен
      />
      <GameInfoPage
        gameState={game?.gameState}
        title={game?.title}
        description={game?.description}
        change={(changes: GameChanges) => dispatch(changeGame(changes))}
        updateGame={() => dispatch(updateGame())}
        // TODO: реализовать участие админа в игре
        play={() => 2 + 2}
      />
      <GamePlayersPage players={game?.players} />
    </Page>
  );
};

export default GamePage;
