import './styles.scss';

import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as Copy } from '../../resources/images/copy.svg';
import { FormButton } from '../FormButton/FormButton';
import { bem } from '../../utils/bem';
import sync from 'resources/images/sync.svg';

export type FormInputProps = {
  name: string;
  label?: string;
  validMessage?: string;
  value?: string;
  className?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoComplete?: 'off' | 'on';
  onSync?: Function;
  copied?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: '' | 'password' | 'number';
};

export const FormInput = (props: FormInputProps) => {
  const formInput = bem('FormInput');
  const [syncClasses, setSyncClasses] = useState(formInput.element('SyncButton'));
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setSyncClasses(
        formInput.element('SyncButton', {
          rotation: true,
        }),
      );
      const timer = setTimeout(() => {
        setSyncClasses(formInput.element('SyncButton'));
        setStartAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  const copyToClipboard = useCallback(() => {
    const ignored = navigator.clipboard.writeText(props.value || '');
  }, [props.value]);

  return (
    <div className={formInput()}>
      <div
        className={formInput.element('Body', {
          copied: props.copied,
        })}
      >
        <label
          className={formInput.element('Label', {
            filled: props.value,
          })}
          htmlFor={props.name}
        >
          {props.validMessage ? (
            <span className={formInput.element('ValidationMessage')}>
              {props.validMessage}
            </span>
          ) : (
            props.label
          )}
        </label>
        {!!props.onSync && (
          <img
            className={syncClasses}
            src={sync}
            alt=""
            role="button"
            onClick={() => {
              setStartAnimation(true);
              props.onSync && props.onSync();
            }}
          />
        )}
        <input
          className={formInput.element('Input', {
            invalid: props.validMessage,
            sync: props.onSync,
          })}
          autoFocus={props.autoFocus}
          id={props.name}
          name={props.name}
          type={props.type || 'text'}
          value={props.value}
          autoComplete={props.autoComplete}
          onKeyPress={(e) => props.onEnter && e.key === 'Enter' && props.onEnter(e)}
          onChange={(e) => props.onChange && props.onChange(e.target.value, e)}
          readOnly={props.readOnly}
          disabled={props.disabled}
        />
      </div>
      {props.copied && (
        <FormButton
          classNameContainer={formInput.element(
            'CopyButton',
            {
              copied: props.copied,
            },
            props.className,
          )}
          onClick={copyToClipboard}
        >
          <Copy />
        </FormButton>
      )}
    </div>
  );
};
