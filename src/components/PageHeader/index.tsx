import { FC, ReactNode } from 'react';
import { Tooltip } from 'antd';

import classes from './PageHeader.module.scss';

type Props = {
  title: string;
  extra?: ReactNode;
};
export const PageHeader: FC<Props> = ({ title, extra }) => {
  return (
    <div className={classes.pageHeader}>
      <Tooltip title={title} arrow={false} placement={'bottom'}>
        <div className={classes.pageTitle}>{title}</div>
      </Tooltip>
      <div className={classes.extra}>{extra}</div>
    </div>
  );
};
