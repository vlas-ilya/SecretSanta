import { GameDescription, GameId, GameState, GameTitle } from '../store/model/GameTypes';

import { EditableInput } from '../../../components/EditableInput/EditableInput';
import { Form } from 'components/Form/Form';
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
  onChangeGameInfo: (changes: GameChanges) => void;
};

export const GameInfoPage = ({
  state,
  title,
  description,
  validationErrors,
  onChangeGameInfo,
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
        onChange={(value: GameId) =>
          onChangeGameInfo({
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
        onChange={(value: GameDescription) =>
          onChangeGameInfo({
            description: { value },
          })
        }
      />
    </FormItem>
  </Form>
);
