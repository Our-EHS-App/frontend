import { FC } from 'react';
import classNames from 'classnames';

import { FCProps } from '@interfaces/ICommon';

import classes from './PagePadding.module.scss';

export const PagePadding: FC<FCProps & { className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(classes.pagePadding, className)}>{children}</div>
  );
};
