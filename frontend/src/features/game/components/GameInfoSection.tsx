import {
  GAME_DESCRIPTION_MAX_LENGTH,
  GAME_TITLE_MAX_LENGTH,
  GameDescription,
  GameId,
  GameState,
  GameTitle,
} from 'model';

import { EditableInput } from '../../../components/EditableInput/EditableInput';
import { FieldView } from '../../../components/FieldView/FieldView';
import { Form } from 'components/Form/Form';
import { FormItem } from 'components/FormItem/FormItem';
import { GameChanges } from 'model';
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
        name="Название игры"
        value={title}
        validationMessage={validationErrors['title']}
        onStartEditing={clearValidationErrors}
        maxLength={GAME_TITLE_MAX_LENGTH}
        onChange={(value: GameId) =>
          onChange({
            title: { value },
          })
        }
      />
    </FormItem>
    <FormItem>
      <EditableInput
        name="Описание игры"
        value={description}
        type="Textarea"
        validationMessage={validationErrors['description']}
        onStartEditing={clearValidationErrors}
        maxLength={GAME_DESCRIPTION_MAX_LENGTH}
        onChange={(value: GameDescription) =>
          onChange({
            description: { value },
          })
        }
      />
    </FormItem>
    <FormItem>
      <FieldView
        name="Статус игры"
        value={state === 'INIT' ? 'Подготовка игроков' : 'Запущена'}
      />
    </FormItem>
  </Form>
);
