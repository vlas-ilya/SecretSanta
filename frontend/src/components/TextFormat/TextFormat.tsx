import React from 'react';

export type TextFormatProps = {
  value?: string;
};

export const TextFormat = ({ value }: TextFormatProps) => (
  <>
    {value?.split('\n').map((item, index) => (
      <React.Fragment key={index}>
        {index !== 0 && <br />}
        {item}
      </React.Fragment>
    )) || 'Нет информации'}
  </>
);
