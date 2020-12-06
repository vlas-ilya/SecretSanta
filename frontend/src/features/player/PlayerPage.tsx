import React, { useEffect } from 'react';
import {
  changePlayer,
  loadGameInfo,
  loadPlayerInfo,
  selectGame,
  selectLoadingState,
  selectPlayer,
  updatePlayer,
} from 'features/player/store/player.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { GameInfo } from './components/GameInfo';
import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { PlayerChanges } from '../../../../backend/src/model/PlayerTypes';
import { PlayerInfo } from 'features/player/components/PlayerInfo';

const PlayerPage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const player = useSelector(selectPlayer);
  const game = useSelector(selectGame);

  useEffect(() => {
    dispatch(loadPlayerInfo(props.match.params.id));
    dispatch(loadGameInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <Page className="game-page" loading={loadingState === 'LOADING'}>
      <GameInfo game={game} />
      <PlayerInfo
        // TODO: Отображать target, если статус игры "RUN"
        // TODO: Запретить редактирование, если статус игры "RUN"
        // TODO: Добавить валидацию этого поля
        name={player?.name}
        wish={player?.wish}
        taboo={player?.taboo}
        change={(changes: PlayerChanges) => dispatch(changePlayer(changes))}
        changePassword={() => {}}
        // TODO: реализовать установку / смену паролья
        // TODO: реализовать ввод паролья для логина, если он установлен
        updatePlayer={() => dispatch(updatePlayer())}
      />
    </Page>
  );
};

export default PlayerPage;
