import { AuthenticationProps, withAuthentication } from '../session/withAuthentication';
import React, { useCallback, useEffect, useRef } from 'react';
import { selectGame, selectLoadingStatus } from './store/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { ChangePasswordModal } from './components/ChangePasswordModal';
import { GameChangePin } from './store/model/GameChangePin';
import { GameChanges } from './store/model/GameChange';
import { GameInfoPage } from 'features/game/components/GameInfoPage';
import { GamePlayersPage } from 'features/game/components/GamePlayersPage';
import { GameTitlePage } from 'features/game/components/GameTitlePage';
import { MatchIdentifiable } from '../../utils/classes/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { changeGameInfo } from './store/useCases/changeGameInfo';
import { changeGamePin } from './store/useCases/changeGamePin';
import { loadGameInfo } from './store/useCases/loadGameInfo';
import { startGame } from './store/useCases/startGame';
import { useToggle } from '../../utils/hooks/useToggle';
import { useUseCaseProcessor } from '../../utils/usecase/hooks/useUseCaseProcessor';

const GamePage = (props: MatchIdentifiable & AuthenticationProps) => {
  const { setId, hasSession } = props;
  const loadingStatus = useSelector(selectLoadingStatus);
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const [validationErrors, process, clearValidationErrors] = useUseCaseProcessor();
  const [changeGamePinModal, showChangeGamePinModal, hideChangeGamePinModal] =
    useToggle();
  const hideChangeGamePinModalRef = useRef(hideChangeGamePinModal);

  useEffect(() => {
    props.match.params.id && setId(props.match.params.id);
  }, [dispatch, setId, props.match.params.id]);

  useEffect(() => {
    hasSession && dispatch(loadGameInfo(props.match.params.id));
  }, [dispatch, hasSession, props.match.params.id]);

  const onChangeGameInfo = useCallback(
    (changes: GameChanges) => {
      if (game) {
        process(
          changeGameInfo({
            game,
            changes,
          }),
        );
      }
    },
    [game, process],
  );

  const onChangeGamePin = useCallback(
    (changes: GameChangePin) => {
      if (game) {
        process(changeGamePin(changes, hideChangeGamePinModalRef.current));
      }
    },
    [game, process, hideChangeGamePinModalRef],
  );

  const onStartGame = useCallback(() => {
    if (game) {
      dispatch(startGame());
    }
  }, [game, dispatch]);

  const showChangeGamePinModalAndClearValidation = useCallback(() => {
    clearValidationErrors();
    showChangeGamePinModal();
  }, [clearValidationErrors, showChangeGamePinModal]);

  return (
    <Page className="game-page" loading={loadingStatus.state === 'LOADING'}>
      {game && (
        <>
          <GameTitlePage
            state={game.state}
            registrationId={game.registrationId}
            hasPassword={game.hasPassword}
            onStartGame={onStartGame}
            onChangePin={showChangeGamePinModalAndClearValidation}
          />
          <GameInfoPage
            state={game.state}
            title={game.title}
            description={game.description}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
            onChangeGameInfo={onChangeGameInfo}
          />
          <GamePlayersPage players={game.players} />
          {changeGamePinModal && (
            <ChangePasswordModal
              hasPassword={game.hasPassword}
              validationErrors={validationErrors}
              onChangeGamePin={onChangeGamePin}
              onClose={hideChangeGamePinModal}
            />
          )}
        </>
      )}
    </Page>
  );
};

export default withAuthentication(GamePage);
