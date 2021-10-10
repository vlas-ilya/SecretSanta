import './styles.scss';

import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as Back } from '../../resources/images/back.svg';
import { FieldView } from '../FieldView/FieldView';
import { FormButton } from '../FormButton/FormButton';
import { FormInput } from '../FormInput/FormInput';
import { ReactComponent as Save } from '../../resources/images/save.svg';
import { bem } from '../../utils/bem';
import { useSharedState } from '../../utils/hooks/useSharedState';
import { useToggle } from '../../utils/hooks/useToggle';

export type EditableInputProps = {
  name: string;
  value?: string;
  validationMessage?: string;
  onStartEditing: () => void;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
};

/* TODO (feat): Добавить textarea */
export const EditableInput = ({
  name,
  value,
  onStartEditing,
  validationMessage,
  onChange,
  maxLength,
  disabled,
}: EditableInputProps) => {
  const editableInput = bem('EditableInput');
  const [isEdit, showEditComponent, showViewComponent] = useToggle();
  const [newValue, setNewValue] = useState(value || '');
  const [activeElement, setActiveElement] = useSharedState('editable-input', '');

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
    } else {
      showEditComponent();
    }
  }, [name, activeElement, showViewComponent, showEditComponent]);

  useEffect(() => {
    showViewComponent();
  }, [value, showViewComponent]);

  const apply = useCallback(() => {
    onChange(newValue);
  }, [newValue, onChange]);

  const onPressEnter = useCallback(
    ({ code }) => {
      if (code === 'Enter') {
        showEditComponentAndUpdateState();
      }
    },
    [showEditComponentAndUpdateState],
  );

  if (disabled) {
    return <FieldView name={name} value={value} empty={!value} />;
  }

  return (
    <div className={editableInput()}>
      {isEdit ? (
        <div className={editableInput.element('Edit')}>
          <div className={editableInput.element('ViewContent')}>
            <FormInput
              className={editableInput.element('ValueEdit')}
              name={name}
              label={name}
              value={newValue}
              onChange={setNewValue}
              validMessage={validationMessage}
              onEnter={apply}
              autoFocus
              maxLength={maxLength}
            />
          </div>
          <FormButton
            classNameContainer={editableInput.element('ShowViewButton')}
            className="grey"
            onClick={showViewComponent}
          >
            <Back />
          </FormButton>
          <FormButton
            classNameContainer={editableInput.element('ApplyButton')}
            onClick={apply}
          >
            <Save />
          </FormButton>
        </div>
      ) : (
        <div className={editableInput.element('View')}>
          <div className={editableInput.element('ViewContent')}>
            <>
              <span className={editableInput.element('NameLabel')}>{name}</span>
              <span
                title="Редактировать"
                className={editableInput.element('ValueLabel')}
                role="button"
                tabIndex={0}
                onKeyPress={onPressEnter}
                onClick={showEditComponentAndUpdateState}
              >
                {value}
              </span>
            </>
          </div>
        </div>
      )}
    </div>
  );
};
