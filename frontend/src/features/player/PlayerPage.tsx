import React, { useEffect } from 'react';
import {
  changePlayer,
  loadPlayerInfo,
  selectLoadingState,
  selectPlayer,
  updatePlayer,
} from './store/player.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { MatchIdentifiable } from 'model/Types';
import Page from 'components/Page/Page';
import { PlayerInfo } from 'features/player/components/PlayerInfo';
import { PlayerChanges } from '../../model/Player';

const PlayerPage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const player = useSelector(selectPlayer);

  useEffect(() => {
    dispatch(loadPlayerInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <Page className="game-page" loading={loadingState === 'LOADING'}>
      <PlayerInfo
        name={player?.name}
        wish={player?.wish}
        dontWish={player?.dontWish}
        change={(changes: PlayerChanges) => dispatch(changePlayer(changes))}
        updatePlayer={() => dispatch(updatePlayer())}
      />
    </Page>
  );
};

export default PlayerPage;
