import './styles.scss';

import React, { ReactNode } from 'react';

export type FormItemProps = {
  children: ReactNode;
};

export const FormItem = (props: FormItemProps) => <div className="form-item">{props.children}</div>;
