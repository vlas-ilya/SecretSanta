import React, { useEffect, useState } from 'react';
import { changePassword, changePlayerPassword } from './store/player.reducer';
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

import { ChangePasswordModal } from './components/ChangePasswordModal';
import { ChangePlayerPasswordMessageVo } from '../../model/ChangePlayerPasswordMessageVo';
import { GameInfo } from './components/GameInfo';
import { InputPasswordModal } from './components/InputPasswordModal';
import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { PlayerChanges } from '../../../../backend/src/model/PlayerTypes';
import { PlayerInfo } from 'features/player/components/PlayerInfo';

const PlayerPage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const player = useSelector(selectPlayer);
  const game = useSelector(selectGame);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState(
    new ChangePlayerPasswordMessageVo(),
  );

  useEffect(() => {
    dispatch(loadPlayerInfo(props.match.params.id));
    dispatch(loadGameInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const onChangePassword = () => {
    if (!player?.hasPassword) {
      dispatch(changePassword(changePasswordMessage));
      setShowChangePasswordModal(false);
      return;
    }
    if (player.password !== changePasswordMessage.oldPassword) {
      return;
    }
    if (changePasswordMessage.newPassword !== changePasswordMessage.confirmNewPassword) {
      return;
    }
    dispatch(changePassword(changePasswordMessage));
    setShowChangePasswordModal(false);
  };

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
        hasPassword={player?.hasPassword}
        change={(changes: PlayerChanges) => dispatch(changePlayer(changes))}
        changePassword={() => setShowChangePasswordModal(true)}
        updatePlayer={() => dispatch(updatePlayer())}
      />
      {showChangePasswordModal && (
        <ChangePasswordModal
          changePasswordMessage={changePasswordMessage}
          setChangePasswordMessage={setChangePasswordMessage}
          hasPassword={player?.hasPassword}
          changePassword={onChangePassword}
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
      {loadingState[0] === 'ERROR' && loadingState[1] === 'INCORRECT_PLAYER_PASSWORD' && (
        <InputPasswordModal
          onInputPassword={(password) => {
            dispatch(changePlayerPassword([props.match.params.id, password]));
            dispatch(loadGameInfo(props.match.params.id));
          }}
        />
      )}
    </Page>
  );
};

export default PlayerPage;
