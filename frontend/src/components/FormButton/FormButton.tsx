import './styles.scss';

import React, { MouseEventHandler, ReactNode } from 'react';

export type FormButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
  className?: string;
};

export const FormButton = (props: FormButtonProps) => (
  <div className="form-button">
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  </div>
);
