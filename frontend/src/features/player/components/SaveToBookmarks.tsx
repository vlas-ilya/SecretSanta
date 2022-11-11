import React, { useMemo } from 'react';
import { canSaveToBookmarks, howToSave } from '../../../utils/saveToBookmarks';

import { Form } from '../../../components/Form/Form';
import { FormButton } from '../../../components/FormButton/FormButton';
import { FormItem } from '../../../components/FormItem/FormItem';
import { Text } from '../../../components/Text/Text';

export type SaveToBookmarksProps = {
  onSave: () => void;
  onClose: () => void;
};

export const SaveToBookmarks = ({ onSave, onClose }: SaveToBookmarksProps) => {
  const canSaveToBookmarksMemo = useMemo(() => {
    return canSaveToBookmarks();
  }, []);

  const howToSaveMemo = useMemo(() => {
    return howToSave();
  }, []);

  return (
    <Form>
      <FormItem>
        <Text type="h1">Сохраните страницу в закладки</Text>
        {canSaveToBookmarksMemo ? (
          <Text type="span">
            На эту страницу вы можете попасть только по прямой ссылке. Сохраните ее в
            закладки, чтобы не потерять
          </Text>
        ) : (
          <Text type="span">
            На эту страницу вы можете попасть только по прямой ссылке. Сохраните ее в
            закладки комбинацией клавиш <strong>{howToSaveMemo}</strong>, чтобы не потерять
          </Text>
        )}
      </FormItem>
      <div className="actions">
        <FormButton className="grey" onClick={onClose}>
          Закрыть
        </FormButton>
        {canSaveToBookmarksMemo && (
          <FormButton onClick={onSave}>Сохранить в закладки</FormButton>
        )}
      </div>
    </Form>
  );
};
