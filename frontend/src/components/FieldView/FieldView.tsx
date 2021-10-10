import './styles.scss';

import React from 'react';
import { bem } from '../../utils/bem';

export type FieldViewProps = {
  name: string;
  value?: string;
  empty?: boolean
};

export const FieldView = ({ name, value, empty }: FieldViewProps) => {
  const fieldView = bem('FieldView');
  return (
    <div className={fieldView.element('View')}>
      <div className={fieldView.element('ViewContent')}>
        <>
          <span className={fieldView.element('NameLabel')}>{name}</span>
          <span
            className={fieldView.element('ValueLabel', { empty })}
          >
            {value || 'Не указано'}
          </span>
        </>
      </div>
    </div>
  );
};
