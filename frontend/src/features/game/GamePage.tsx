import { AuthenticationProps, withAuthentication } from '../session/withAuthentication';
import React, { useCallback, useEffect, useRef } from 'react';
import { selectGame, selectLoadingStatus } from './store/game.selectors';
import { useDispatch, useSelector } from 'react-redux';

import { GameChangePin } from './store/model/GameChangePin';
import { GameChanges } from './store/model/GameChange';
import { GameInfoSection } from 'features/game/components/GameInfoSection';
import { GamePlayersSection } from 'features/game/components/GamePlayersSection';
import { GameTitleSection } from 'features/game/components/GameTitleSection';
import { MatchIdentifiable } from '../../utils/classes/MatchIdentifiable';
import { Page } from 'components/Page/Page';
import { changeGameInfo } from './store/useCases/changeGameInfo';
import { changeGamePin } from './store/useCases/changeGamePin';
import { loadGameInfo } from './store/useCases/loadGameInfo';
import { startGame } from './store/useCases/startGame';
import { useToggle } from '../../utils/hooks/useToggle';
import { useUseCaseProcessor } from '../../utils/usecase/hooks/useUseCaseProcessor';
import { ChangePinModal } from '../../components/ChangePinModal/ChangePinModal';

const GamePage = ({
  setId,
  match,
  hasSession,
}: MatchIdentifiable & AuthenticationProps) => {
  const id = match.params.id;

  const loadingStatus = useSelector(selectLoadingStatus);
  const game = useSelector(selectGame);
  const gameRef = useRef(game);
  const dispatch = useDispatch();
  const [validationErrors, process, clearValidationErrors] = useUseCaseProcessor();
  const [changePinModal, showChangePinModal, hideChangeModal] = useToggle();
  const hideChangePinModalRef = useRef(hideChangeModal);

  useEffect(() => {
    gameRef.current = game;
  }, [game, gameRef])

  useEffect(() => {
    hideChangePinModalRef.current = hideChangeModal;
  }, [hideChangePinModalRef, hideChangeModal])

  useEffect(() => {
    id && setId(id);
  }, [dispatch, setId, id]);

  useEffect(() => {
    hasSession && dispatch(loadGameInfo(id));
  }, [dispatch, hasSession, id]);

  const onChangeGameInfo = useCallback(
    (changes: GameChanges) => {
      if (gameRef.current) {
        process(
          changeGameInfo({
            game: gameRef.current,
            changes,
          }),
        );
      }
    },
    [gameRef, process],
  );

  const onChangeGamePin = useCallback(
    (changes: GameChangePin) => {
      process(changeGamePin(changes, hideChangePinModalRef));
    },
    [process, hideChangePinModalRef],
  );

  const onStartGame = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  const showChangeGamePinModalAndClearValidation = useCallback(() => {
    clearValidationErrors();
    showChangePinModal();
  }, [clearValidationErrors, showChangePinModal]);

  return (
    <Page className="game-page" loading={loadingStatus.state === 'LOADING'}>
      {game && (
        <>
          <GameTitleSection
            state={game.state}
            registrationId={game.registrationId}
            hasPassword={game.hasPassword}
            onStartGame={onStartGame}
            onChangePin={showChangeGamePinModalAndClearValidation}
          />
          <GameInfoSection
            state={game.state}
            title={game.title}
            description={game.description}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
            onChange={onChangeGameInfo}
          />
          <GamePlayersSection players={game.players} />
          {changePinModal && (
            <ChangePinModal
              hasPassword={game.hasPassword}
              validationErrors={validationErrors}
              onSetNewPin={onChangeGamePin}
              onClose={hideChangeModal}
              makeChanges={GameChangePin.build}
            />
          )}
        </>
      )}
    </Page>
  );
};

export default withAuthentication(GamePage);
