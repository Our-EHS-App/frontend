import { FC, ReactNode } from 'react';
import { Radio } from 'antd';

import classes from './OutlineRadius.module.scss';

type Props = {
  value: string;
  children: ReactNode;
};

export const OutlineRadius: FC<Props> = ({ value, children }) => {
  return (
    <Radio className={classes.outLined} value={value}>
      {children}
    </Radio>
  );
};
