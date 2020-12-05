import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export interface TextareaProps {
  name: string;
  label?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
}

export const Textarea = ({ name, label, value, onChange, readOnly, disabled }: TextareaProps) => (
  <div
    className={classNames('textarea', {
      filled: value,
    })}
  >
    <label htmlFor={name}>{label}</label>
    <textarea
      name={name}
      id={name}
      onChange={(e) => onChange && onChange(e.target.value, e)}
      readOnly={readOnly}
      disabled={disabled}
      value={value}
    />
  </div>
);
