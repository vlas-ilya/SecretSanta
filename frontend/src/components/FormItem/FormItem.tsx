import './styles.scss';

import React, { ReactNode } from 'react';

export interface FormItemProps {
  children: ReactNode;
}

export default function FormItem({ children }: FormItemProps) {
  return <div className="form-item">{children}</div>;
}
