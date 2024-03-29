import './FieldView.styles.scss';

import React from 'react';
import { bem } from '../../utils/bem';
import { TextFormat } from '../TextFormat/TextFormat';

export type FieldViewProps = {
  name: string;
  value?: string;
  empty?: boolean;
};

export const FieldView = ({ name, value, empty }: FieldViewProps) => {
  const fieldView = bem('FieldView');
  return (
    <div className={fieldView.element('View')}>
      <div className={fieldView.element('ViewContent')}>
        <>
          <span className={fieldView.element('NameLabel')}>{name}</span>
          <span className={fieldView.element('ValueLabel', { empty })}>
            <TextFormat value={value}/>
          </span>
        </>
      </div>
    </div>
  );
};
