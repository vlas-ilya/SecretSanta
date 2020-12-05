import './styles.scss';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import sync from 'images/sync.svg';

export type FormInputProps = {
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
};

export const FormInput = (props: FormInputProps) => {
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
        filled: props.value,
        invalid: props.validMessage,
        sync: !!props.onSync,
      })}
    >
      <label htmlFor={props.name}>
        {!props.validMessage ? (
          props.label
        ) : (
          <span className="validMessage">{props.validMessage}</span>
        )}
      </label>
      {props.onSync && (
        <img
          className={syncClasses}
          src={sync}
          alt=""
          onClick={() => {
            setStartAnimation(true);
            props.onSync && props.onSync();
          }}
        />
      )}
      <input
        id={props.name}
        name={props.name}
        type="text"
        value={props.value}
        autoComplete={props.autoComplete}
        onKeyPress={(e) => props.onEnter && e.key === 'Enter' && props.onEnter(e)}
        onChange={(e) => props.onChange && props.onChange(e.target.value, e)}
        readOnly={props.readOnly}
        disabled={props.disabled}
      />
    </div>
  );
};
