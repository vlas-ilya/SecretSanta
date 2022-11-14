import './Text.styles.scss';
import './Text.styles.scss';

import React, { ReactNode } from 'react';

export type TextProps = {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'strong' | 'p';
  children: ReactNode;
};

export const Text = (props: TextProps) => {
  switch (props.type) {
    case 'h1':
      return <h1 className="text">{props.children}</h1>;
    case 'h2':
      return <h2 className="text">{props.children}</h2>;
    case 'h3':
      return <h3 className="text">{props.children}</h3>;
    case 'h4':
      return <h4 className="text">{props.children}</h4>;
    case 'p':
      return <p className="text">{props.children}</p>;
    case 'strong':
      return <strong className="text">{props.children}</strong>;
    case 'span':
    default:
      return <span className="text">{props.children}</span>;
  }
};
