import './styles.scss';
import './styles.scss';

import React, { ReactNode } from 'react';

export interface TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'strong' | 'p';
  children: ReactNode;
}

export default function Text({ children, type = 'span' }: TextProps) {
  switch (type) {
    case 'h1':
      return <h1 className="text">{children}</h1>;
    case 'h2':
      return <h2 className="text">{children}</h2>;
    case 'h3':
      return <h3 className="text">{children}</h3>;
    case 'h4':
      return <h4 className="text">{children}</h4>;
    case 'p':
      return <p className="text">{children}</p>;
    case 'strong':
      return <strong className="text">{children}</strong>;
    case 'span':
    default:
      return <span className="text">{children}</span>;
  }
}
