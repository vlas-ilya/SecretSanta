import './styles.scss';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as Copy } from '../../resources/images/copy.svg';
import { FormButton } from '../FormButton/FormButton';
import { ReactComponent as Hide } from '../../resources/images/hide.svg';
import { ReactComponent as Show } from '../../resources/images/show.svg';
import { bem } from '../../utils/bem';
import sync from 'resources/images/sync.svg';
import { useToggle } from '../../utils/hooks/useToggle';

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
  digits?: boolean;
  copied?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  type?: '' | 'password' | 'number' | 'text';
};

export const FormInput = ({
  value,
  type,
  onChange,
  onSync,
  copied,
  name,
  validMessage,
  label,
  autoFocus,
  autoComplete,
  disabled,
  readOnly,
  className,
  onEnter,
  digits,
  maxLength,
}: FormInputProps) => {
  const formInput = bem('FormInput');
  const [syncClasses, setSyncClasses] = useState(formInput.element('SyncButton'));
  const [startAnimation, setStartAnimation] = useState(false);
  const [isPasswordHidden, showPassword, hidePassword] = useToggle();
  const [realType, setRealType] = useState(type);
  const input = useRef<HTMLInputElement>(null);

  const showPasswordAndSetTypeNumber = useCallback(() => {
    setRealType('text');
    showPassword();
    input.current?.focus();
  }, [setRealType, showPassword]);

  const hidePasswordAndSetTypePassword = useCallback(() => {
    setRealType('password');
    hidePassword();
    input.current?.focus();
  }, [setRealType, hidePassword]);

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
  }, [startAnimation, formInput]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(value || '').then(() => undefined);
    input.current?.focus();
  }, [value]);

  const onChangeHandler = useCallback(
    (e) => {
      onChange &&
        onChange(digits ? e.target.value.replace(/\D/g, '') : e.target.value, e);
    },
    [onChange, digits],
  );

  const onSyncHandler = useCallback(() => {
    setStartAnimation(true);
    onSync && onSync();
    input.current?.focus();
  }, [onSync, setStartAnimation]);

  const onKeyPress = useCallback(
    (e) => {
      onEnter && e.key === 'Enter' && onEnter(e);
    },
    [onEnter],
  );

  return (
    <div className={formInput()}>
      <div
        className={formInput.element('Body', {
          copied,
          sync: onSync,
          togglePassword: type === 'password',
        })}
      >
        <label
          className={formInput.element('Label', {
            filled: value,
          })}
          htmlFor={name}
        >
          {validMessage ? (
            <span className={formInput.element('ValidationMessage')}>{validMessage}</span>
          ) : (
            label
          )}
        </label>

        {type === 'password' &&
          (isPasswordHidden ? (
            <Show
              className={formInput.element('TogglePassword', {
                invalid: validMessage,
              })}
              onClick={hidePasswordAndSetTypePassword}
              role="button"
            />
          ) : (
            <Hide
              className={formInput.element('TogglePassword', {
                invalid: validMessage,
              })}
              onClick={showPasswordAndSetTypeNumber}
              role="button"
            />
          ))}

        {!!onSync && (
          <img
            className={syncClasses}
            src={sync}
            alt=""
            role="button"
            onClick={onSyncHandler}
          />
        )}

        <input
          className={formInput.element('Input', {
            invalid: validMessage,
            sync: onSync,
            togglePassword: type === 'password',
          })}
          inputMode={digits ? 'numeric' : 'text'}
          ref={input}
          autoFocus={autoFocus}
          id={name}
          name={name}
          type={realType || 'text'}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
          value={value}
          onKeyPress={onKeyPress}
          onChange={onChangeHandler}
          maxLength={maxLength}
        />
      </div>
      {copied && (
        <FormButton
          classNameContainer={formInput.element(
            'CopyButton',
            {
              copied,
            },
            className,
          )}
          onClick={copyToClipboard}
        >
          <Copy />
        </FormButton>
      )}
    </div>
  );
};
