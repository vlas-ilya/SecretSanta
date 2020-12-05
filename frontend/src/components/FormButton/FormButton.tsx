import './styles.scss';

import React, { MouseEventHandler, ReactNode } from 'react';

export interface FormButtonProps {
  onClick: MouseEventHandler;
  children: ReactNode;
  className?: string
}

export default function FormButton({ onClick, children, className }: FormButtonProps) {
  return (
    <div className="form-button">
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
}
