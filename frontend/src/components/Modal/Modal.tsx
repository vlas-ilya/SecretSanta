import './styles.scss';

import React, { ReactNode } from 'react';
import classNames from 'classnames';
import close from '../../images/close.svg';

export type ModalProps = {
  actions: ReactNode,
  title: string,
  className?: string,
  noPadding?: boolean,
  children: ReactNode,
  onClose: () => void,
  showCloseButton?: boolean,
}

export default function Modal(props: ModalProps) {
  return (
    <div className="modal-back" onClick={props.onClose}>
      <div
        className={classNames('modal', props.className, { 'show-close-button': props.showCloseButton })}
        onClick={(e) => e.stopPropagation()}
      >
        {props.title && (
          <div className="modal-title">
            <h2>{props.title}</h2>
            <img className="close" role="button" onClick={props.onClose} src={close} alt="close" />
          </div>
        )}
        <div className={classNames('modal-body', { 'no-padding': props.noPadding })}>{props.children}</div>
        <div className="modal-actions">{props.actions}</div>
      </div>
    </div>
  );
}
