import './styles.scss';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { ReactComponent as Back } from '../../resources/images/back.svg';
import { FormButton } from '../FormButton/FormButton';
import { FormInput } from '../FormInput/FormInput';
import { ReactComponent as Save } from '../../resources/images/save.svg';
import { useSharedState } from '../../utils/hooks/useSharedState';
import { useToggle } from '../../utils/hooks/useToggle';

export type EditableInputProps = {
  name: string;
  value?: string;
  validationMessage?: string;
  onStartEditing: () => void;
  onChange: (value: string) => void;
  maxLength?: number;
};

/* TODO (feat): Добавить textarea */
/* TODO (fix): Padding с права не работает */
export const EditableInput = ({
  name,
  value,
  onStartEditing,
  validationMessage,
  onChange,
  maxLength,
}: EditableInputProps) => {
  const [isEdit, showEditComponent, showViewComponent] = useToggle();
  const [newValue, setNewValue] = useState(value || '');
  const [activeElement, setActiveElement] = useSharedState('editable-input', '');

  const apply = useCallback(() => {
    onChange(newValue);
  }, [newValue, onChange]);

  useEffect(() => {
    setNewValue(value || '');
  }, [isEdit, value, setNewValue]);

  const showEditComponentAndUpdateState = useCallback(() => {
    onStartEditing();
    setActiveElement(name);
    showEditComponent();
  }, [name, setActiveElement, showEditComponent, onStartEditing]);

  useEffect(() => {
    if (activeElement !== name) {
      showViewComponent();
    }
  }, [name, activeElement, showViewComponent]);

  useEffect(() => {
    showViewComponent();
  }, [value, showViewComponent]);

  return (
    <div className="EditableInput">
      {isEdit ? (
        <Edit
          name={name}
          onChange={setNewValue}
          apply={apply}
          validationMessage={validationMessage}
          showViewComponent={showViewComponent}
          value={newValue}
          maxLength={maxLength}
        />
      ) : (
        <View name={name} showEditComponent={showEditComponentAndUpdateState}>
          {value}
        </View>
      )}
    </div>
  );
};

const View = ({
  name,
  children,
  showEditComponent,
}: {
  name?: string;
  children: ReactNode;
  showEditComponent: () => void;
}) => {
  const onPressEnter = useCallback(
    ({ code }) => {
      if (code === 'Enter') {
        showEditComponent();
      }
    },
    [showEditComponent],
  );

  return (
    <div className="EditableInput_View">
      <div className="EditableInput_ViewContent">
        <>
          <span className="EditableInput_NameLabel">{name}</span>
          <span
            title="Редактировать"
            className="EditableInput_ValueLabel"
            role="button"
            tabIndex={0}
            onKeyPress={onPressEnter}
            onClick={showEditComponent}
          >
            {children}
          </span>
        </>
      </div>
    </div>
  );
};

const Edit = ({
  name,
  value,
  validationMessage,
  onChange,
  apply,
  showViewComponent,
  maxLength,
}: {
  name: string;
  value: string;
  validationMessage?: string;
  onChange: (value: string) => void;
  apply: () => void;
  showViewComponent: () => void;
  maxLength?: number;
}) => (
  <div className="EditableInput_Edit">
    <FormInput
      className="EditableInput_ValueEdit"
      name={name}
      label={name}
      value={value}
      onChange={onChange}
      validMessage={validationMessage}
      onEnter={apply}
      autoFocus
      maxLength={maxLength}
    />
    <FormButton
      classNameContainer="EditableInput_ShowViewButton"
      className="grey"
      onClick={showViewComponent}
    >
      <Back />
    </FormButton>
    <FormButton classNameContainer="EditableInput_ApplyButton" onClick={apply}>
      <Save />
    </FormButton>
  </div>
);
