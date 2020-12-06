import './styles.scss';

import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';
import classNames from 'classnames';

export type TextareaProps = {
  name: string;
  label?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

export const Textarea = (props: TextareaProps) => (
  <div
    className={classNames('textarea', {
      filled: props.value,
    })}
  >
    <label htmlFor={props.name}>{props.label}</label>
    <TextareaAutosize
      name={props.name}
      id={props.name}
      minRows={3}
      onChange={(e) => props.onChange && props.onChange(e.target.value, e)}
      readOnly={props.readOnly}
      disabled={props.disabled}
      value={props.value}
    />
  </div>
);
