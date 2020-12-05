import React, { useEffect } from 'react';
import {
  changePlayer,
  loadPlayerInfo,
  selectLoadingState,
  selectPlayer,
  updatePlayer,
} from './store/player.reducer';
import { useDispatch, useSelector } from 'react-redux';

import Page from '../../components/Page/Page';
import { PlayerInfo } from './components/PlayerInfo';

const PlayerPage = ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const player = useSelector(selectPlayer);

  useEffect(() => {
    dispatch(loadPlayerInfo(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Page className="game-page" loading={loadingState === 'LOADING'}>
      <PlayerInfo
        name={player?.name}
        wish={player?.wish}
        dontWish={player?.dontWish}
        change={(field, value) => dispatch(changePlayer({ field, value }))}
        updatePlayer={() => dispatch(updatePlayer())}
      />
    </Page>
  );
};

export default PlayerPage;
