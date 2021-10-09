import { GameDescription, GameId, GameState, GameTitle } from '../store/model/GameTypes';

import { EditableInput } from '../../../components/EditableInput/EditableInput';
import { Form } from 'components/Form/Form';
import { FormInput } from '../../../components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import { GameChanges } from '../store/model/GameChange';
import React from 'react';
import { Text } from 'components/Text/Text';

export type GameInfoProps = {
  state?: GameState;
  title?: GameTitle;
  description?: GameDescription;
  validationErrors: Record<string, string>;
  clearValidationErrors: () => void;
  onChange: (changes: GameChanges) => void;
};

export const GameInfoSection = ({
  state,
  title,
  description,
  validationErrors,
  onChange,
  clearValidationErrors,
}: GameInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игре</Text>
    </FormItem>
    <FormItem>
      <EditableInput
        name="Заголовок"
        value={title}
        validationMessage={validationErrors['title']}
        onStartEditing={clearValidationErrors}
        maxLength={255} /*TODO (fix): Вынести константы в глобальные параметры для обоих проектов*/
        onChange={(value: GameId) =>
          onChange({
            title: { value },
          })
        }
      />
    </FormItem>
    <FormItem>
      <EditableInput
        name="Описание"
        value={description}
        validationMessage={validationErrors['description']}
        onStartEditing={clearValidationErrors}
        maxLength={1000} /*TODO (fix): Вынести константы в глобальные параметры для обоих проектов*/
        onChange={(value: GameDescription) =>
          onChange({
            description: { value },
          })
        }
      />
    </FormItem>
    <FormItem>
      <FormInput
        name="title"
        label="Статус игры"
        value={state === 'INIT' ? 'Подготовка игроков' : 'Запущена'}
        disabled
      />
    </FormItem>
  </Form>
);
