import React, { useEffect, useState } from 'react';
import {
  changeGame,
  changeGamePassword,
  changePassword,
  loadGameInfo,
  selectGame,
  selectLoadingState,
  startGame,
  updateGame,
} from 'features/game/store/game.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { ChangeGamePasswordMessageVo } from '../../model/ChangeGamePasswordMessageVo';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { GameChanges } from '../../../../backend/src/model/GameTypes';
import { GameInfoPage } from 'features/game/components/GameInfoPage';
import { GamePlayersPage } from 'features/game/components/GamePlayersPage';
import { GameTitlePage } from 'features/game/components/GameTitlePage';
import { InputPasswordModal } from './components/InputPasswordModal';
import { MatchIdentifiable } from 'model/MatchIdentifiable';
import { Page } from 'components/Page/Page';

const GamePage = (props: MatchIdentifiable) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoadingState);
  const game = useSelector(selectGame);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [changePasswordMessage, setChangePasswordMessage] = useState(
    new ChangeGamePasswordMessageVo(),
  );

  useEffect(() => {
    dispatch(loadGameInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const onChangePassword = () => {
    if (!game?.hasPassword) {
      dispatch(changePassword(changePasswordMessage));
      setShowChangePasswordModal(false);
      return;
    }
    if (game.password !== changePasswordMessage.oldPassword) {
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
      <GameTitlePage
        hasPassword={game?.hasPassword}
        gameState={game?.gameState}
        registrationId={game?.registrationId}
        startGame={() => dispatch(startGame())}
        changePassword={() => setShowChangePasswordModal(true)}
      />
      <GameInfoPage
        // TODO: добавить валидацию title и description
        gameState={game?.gameState}
        title={game?.title}
        description={game?.description}
        change={(changes: GameChanges) => dispatch(changeGame(changes))}
        updateGame={() => dispatch(updateGame())}
        // TODO: реализовать участие админа в игре
        play={() => 2 + 2}
      />
      <GamePlayersPage players={game?.players} />
      {showChangePasswordModal && (
        <ChangePasswordModal
          changePasswordMessage={changePasswordMessage}
          setChangePasswordMessage={setChangePasswordMessage}
          hasPassword={game?.hasPassword}
          changePassword={onChangePassword}
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
      {loadingState[0] === 'ERROR' && loadingState[1] === 'INCORRECT_GAME_PASSWORD' && (
        <InputPasswordModal
          onInputPassword={(password) => {
            dispatch(changeGamePassword([props.match.params.id, password]));
            dispatch(loadGameInfo(props.match.params.id));
          }}
        />
      )}
    </Page>
  );
};

export default GamePage;
