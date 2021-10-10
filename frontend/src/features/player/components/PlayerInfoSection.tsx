import {
  GameState,
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_TABOO_MAX_LENGTH,
  PLAYER_WISH_MAX_LENGTH,
  PlayerChanges,
  PlayerName,
  PlayerState,
  PlayerTaboo,
  PlayerWish,
} from 'model';

import { EditableInput } from 'components/EditableInput/EditableInput';
import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';

export type PlayerInfoProps = {
  gameState: GameState;
  name?: PlayerName;
  wish?: PlayerWish;
  taboo?: PlayerTaboo;
  state?: PlayerState;
  hasPassword?: boolean;
  validationErrors: Record<string, string>;
  clearValidationErrors: () => void;
  onChange: (changes: PlayerChanges) => void;
  onShowChangePlayerPinModal: () => void;
};

export const PlayerInfoSection = ({
  gameState,
  name,
  wish,
  taboo,
  state,
  validationErrors,
  clearValidationErrors,
  onChange,
  hasPassword,
  onShowChangePlayerPinModal,
}: PlayerInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игроке</Text>
    </FormItem>
    {state === PlayerState.INIT && (
      <Text type="p">Для участия в игре вам необходимо указать информацию о себе</Text>
    )}
    <FormItem>
      <FormItem>
        <EditableInput
          name="Имя и Фамилия"
          value={name}
          disabled={gameState !== GameState.INIT}
          validationMessage={validationErrors['name']}
          onStartEditing={clearValidationErrors}
          maxLength={PLAYER_NAME_MAX_LENGTH}
          onChange={(value: PlayerName) =>
            onChange({
              name: { value },
            })
          }
        />
      </FormItem>
    </FormItem>
    <FormItem>
      {/* TODO (feat): Переделать на textarea */}
      <EditableInput
        name="Пожелания"
        value={wish}
        disabled={gameState !== GameState.INIT}
        validationMessage={validationErrors['wish']}
        onStartEditing={clearValidationErrors}
        maxLength={PLAYER_WISH_MAX_LENGTH}
        onChange={(value: PlayerWish) =>
          onChange({
            wish: { value },
          })
        }
      />
    </FormItem>
    <FormItem>
      {/* TODO (feat): Переделать на textarea */}
      <EditableInput
        name="Не дарить ни в коем случае"
        value={taboo}
        disabled={gameState !== GameState.INIT}
        validationMessage={validationErrors['taboo']}
        onStartEditing={clearValidationErrors}
        maxLength={PLAYER_TABOO_MAX_LENGTH}
        onChange={(value: PlayerTaboo) =>
          onChange({
            taboo: { value },
          })
        }
      />
    </FormItem>
    {gameState === GameState.INIT && (
      <>
        {!hasPassword && (
          <FormItem>
            <Text type="p">Чтобы защитить эту страницу, вы можете установить пин-код</Text>
          </FormItem>
        )}
        <div className="actions">
          <FormButton className="grey" onClick={onShowChangePlayerPinModal}>
            {hasPassword ? 'Изменить пин-код' : 'Установить пин-код'}
          </FormButton>
        </div>
      </>
    )}
  </Form>
);
