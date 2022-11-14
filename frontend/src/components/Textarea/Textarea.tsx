import './Textarea.styles.scss';

import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

export type TextareaProps = {
  name: string;
  label?: string;
  validMessage?: string;
  value?: string;
  className?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
};

export const Textarea = (props: TextareaProps) => (
  <div
    className={classNames('textarea', props.className, {
      filled: props.value,
    })}
  >
    <label htmlFor={props.name}>{props.label}</label>
    <TextareaAutosize
      name={props.name}
      id={props.name}
      minRows={4}
      onChange={(e) => props.onChange && props.onChange(e.target.value, e)}
      readOnly={props.readOnly}
      disabled={props.disabled}
      value={props.value}
    />
  </div>
);
