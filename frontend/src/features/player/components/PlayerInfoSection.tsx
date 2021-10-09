import { PlayerName, PlayerTaboo, PlayerWish } from '../store/model/PlayerTypes';

import { EditableInput } from '../../../components/EditableInput/EditableInput';
import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormItem } from 'components/FormItem/FormItem';
import { GameState } from '../../game/store/model/GameTypes';
import { PlayerChanges } from '../store/model/PlayerChange';
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
          maxLength={255} /*TODO (fix): Вынести константы в глобальные параметры для обоих проектов*/
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
        maxLength={1000} /*TODO (fix): Вынести константы в глобальные параметры для обоих проектов*/
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
        maxLength={1000} /*TODO (fix): Вынести константы в глобальные параметры для обоих проектов*/
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
