

import { Form } from 'components/Form/Form';
import { FormButton } from 'components/FormButton/FormButton';
import { FormInput } from 'components/FormInput/FormInput';
import { FormItem } from 'components/FormItem/FormItem';
import React from 'react';
import { Text } from 'components/Text/Text';
import { ValidationError } from '../../../utils/usecase/UseCase';
import { GameDescription, GameState, GameTitle } from '../store/model/GameTypes';
import { GameChanges } from '../store/model/GameChange';

export type GameInfoProps = {
  state?: GameState;
  title?: GameTitle;
  description?: GameDescription;
  validationError?: ValidationError[]
  onChangeGameInfo: (changes: GameChanges) => void;
};

export const GameInfoPage = (props: GameInfoProps) => (
  <Form>
    <FormItem>
      <Text type="h1">Информация об игре</Text>
    </FormItem>
    <FormItem>

    </FormItem>
    <FormItem>

    </FormItem>
  </Form>
);
