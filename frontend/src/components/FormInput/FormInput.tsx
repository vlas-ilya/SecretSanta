import './styles.scss';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import sync from './sync.svg';

export interface FormInputProps {
  name: string;
  label?: string;
  validMessage?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: 'off' | 'on';
  onSync?: Function;
  readOnly?: boolean;
  disabled?: boolean;
}

export default function FormInput({
  name,
  label,
  validMessage,
  value,
  onChange,
  onEnter,
  autoComplete = 'off',
  onSync,
  readOnly,
  disabled,
}: FormInputProps) {
  const [syncClasses, setSyncClasses] = useState('sync');
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setSyncClasses('sync rotation');
      const timer = setTimeout(() => {
        setSyncClasses('sync');
        setStartAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  return (
    <div
      className={classNames('form-input', {
        filled: value,
        invalid: validMessage,
        sync: !!onSync,
      })}
    >
      <label htmlFor={name}>{!validMessage ? label : <span className="validMessage">{validMessage}</span>}</label>
      {onSync && (
        <img
          className={syncClasses}
          src={sync}
          alt=""
          onClick={() => {
            setStartAnimation(true);
            onSync();
          }}
        />
      )}
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        autoComplete={autoComplete}
        onKeyPress={(e) => onEnter && e.key === 'Enter' && onEnter(e)}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}
