import {
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_TABOO_MAX_LENGTH,
  PLAYER_WISH_MAX_LENGTH,
  PlayerName,
  PlayerTaboo,
  PlayerWish,
} from 'model';

import { EditableInput } from 'components/EditableInput/EditableInput';
import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormItem } from 'components/FormItem/FormItem';
import { GameState } from 'model';
import { PlayerChanges } from 'model';
import React from 'react';
import { Text } from 'components/Text/Text';

export type PlayerInfoProps = {
  gameState: GameState;
  name?: PlayerName;
  wish?: PlayerWish;
  taboo?: PlayerTaboo;
  hasPassword?: boolean;
  validationErrors: Record<string, string>;
  clearValidationErrors: () => void;
  onChange: (changes: PlayerChanges) => void;
  onShowChangePlayerPinModal: () => void;
};

export const PlayerInfoSection = ({
  name,
  wish,
  taboo,
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
    <FormItem>
      <FormItem>
        <EditableInput
          name="Имя и Фамилия"
          value={name}
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
    <div className="actions">
      <FormButton className="grey" onClick={onShowChangePlayerPinModal}>
        {hasPassword ? 'Изменить пароль' : 'Установить пароль'}
      </FormButton>
    </div>
    <FormItem>
      <Text type="p">Чтобы защитить эту страницу, вы можете установить пароль</Text>
    </FormItem>
  </Form>
);
