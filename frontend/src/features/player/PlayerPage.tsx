import { AuthenticationProps, withAuthentication } from '../session/withAuthentication';
import { PLAYER_CHANGE_PIN_MAX_LENGTH, PlayerChangePin } from 'model';
import React, { useCallback, useEffect, useRef } from 'react';
import { selectLoadingStatus, selectPlayer } from './store/player.selectors';
import { useDispatch, useSelector } from 'react-redux';

import { ChangePinModal } from '../../components/ChangePinModal/ChangePinModal';
import { GameInfoSection } from './components/GameInfoSection';
import { MatchIdentifiable } from '../../utils/classes/MatchIdentifiable';
import { Page } from '../../components/Page/Page';
import { PlayerChanges } from 'model';
import { PlayerInfoSection } from './components/PlayerInfoSection';
import { TargetInfoSection } from './components/TargetInfoSection';
import { changePlayerInfo } from './store/useCases/changePlayerInfo';
import { changePlayerPin } from './store/useCases/changePlayerPin';
import { loadPlayerInfo } from './store/useCases/loadPlayerInfo';
import { useToggle } from '../../utils/hooks/useToggle';
import { useUseCaseProcessor } from '../../utils/usecase/hooks/useUseCaseProcessor';

const PlayerPage = ({
  setId,
  hasSession,
  match,
}: MatchIdentifiable & AuthenticationProps) => {
  const id = match.params.id;

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);
  const player = useSelector(selectPlayer);
  const playerRef = useRef(player);
  const [validationErrors, process, clearValidationErrors] = useUseCaseProcessor();
  const [changePinModal, showChangePinModal, hideChangePinModal] = useToggle();
  const hideChangePinModalRef = useRef(hideChangePinModal);

  useEffect(() => {
    playerRef.current = player;
  }, [playerRef, player]);

  useEffect(() => {
    hideChangePinModalRef.current = hideChangePinModal;
  }, [hideChangePinModalRef, hideChangePinModal]);

  useEffect(() => {
    id && setId(id);
  }, [dispatch, setId, id]);

  useEffect(() => {
    hasSession && dispatch(loadPlayerInfo(id));
  }, [dispatch, hasSession, id]);

  const onChangePlayerInfo = useCallback(
    (changes: PlayerChanges) => {
      if (playerRef.current) {
        process(
          changePlayerInfo({
            player: playerRef.current,
            changes,
          }),
        );
      }
    },
    [playerRef, process],
  );

  const onChangePlayerPin = useCallback(
    (changes: PlayerChangePin) => {
      process(changePlayerPin(changes, hideChangePinModalRef));
    },
    [process, hideChangePinModalRef],
  );

  const showChangePlayerPinModalAndClearValidation = useCallback(() => {
    clearValidationErrors();
    showChangePinModal();
  }, [clearValidationErrors, showChangePinModal]);

  return (
    <Page className="game-page" loading={loadingStatus.state === 'LOADING'}>
      {player && (
        <>
          <GameInfoSection game={player?.game} />
          <PlayerInfoSection
            gameState={player?.game.state}
            name={player?.name}
            wish={player?.wish}
            taboo={player?.taboo}
            state={player?.state}
            hasPassword={player?.hasPassword}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
            onChange={onChangePlayerInfo}
            onShowChangePlayerPinModal={showChangePlayerPinModalAndClearValidation}
          />
          {changePinModal && (
            <ChangePinModal
              hasPassword={player.hasPassword}
              validationErrors={validationErrors}
              onSetNewPin={onChangePlayerPin}
              onClose={hideChangePinModal}
              makeChanges={PlayerChangePin.build}
              maxLength={PLAYER_CHANGE_PIN_MAX_LENGTH}
            />
          )}
        </>
      )}
      {player?.target && (
        <TargetInfoSection
          name={player.target.name}
          wish={player.target.wish}
          taboo={player.target.taboo}
        />
      )}
    </Page>
  );
};

export default withAuthentication(PlayerPage);
