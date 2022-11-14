import './AlertBlock.styles.scss';

import React, { useEffect, useState } from 'react';

export type AlertBlockTypes = {
  alert?: {
    value: string;
    code: string;
    date: Date;
  };
};

export default function AlertBlock({ alert }: AlertBlockTypes) {
  const [classNames, setClassNames] = useState('alert');

  useEffect(() => {
    if (alert) {
      setClassNames('alert show');
      const timer = setTimeout(() => setClassNames('alert'), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="alert-block">
      <div className={classNames}>{alert?.value}</div>
    </div>
  );
}
