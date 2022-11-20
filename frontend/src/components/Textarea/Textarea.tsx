import './Textarea.styles.scss';

import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { bem } from '../../utils/bem';

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

export const Textarea = ({
  name,
  label,
  validMessage,
  value,
  onChange,
  readOnly,
  disabled,
  autoFocus,
  maxLength,
}: TextareaProps) => {
  const textarea = bem('Textarea');

  return (
    <div className={textarea()}>
      <div className={textarea.element('Body')}>
        <label
          className={textarea.element('Label', {
            filled: value,
          })}
          htmlFor={name}
        >
          <div>
            {validMessage ? (
              <span className={textarea.element('ValidationMessage')}>
                {validMessage}
              </span>
            ) : (
              label
            )}
          </div>
        </label>
        <TextareaAutosize
          name={name}
          id={name}
          minRows={4}
          autoFocus={autoFocus}
          onChange={(e) => onChange && onChange(e.target.value, e)}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};
