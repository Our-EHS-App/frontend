import { CSSProperties, FC } from 'react';
import { FCProps } from '../../interfaces/ICommon';
import classes from './WhiteContainer.module.scss';
import classNames from 'classnames';
import React from 'react';

interface Props extends FCProps {
  style?: CSSProperties | undefined;
  className?: string | undefined;
  children: any;
}
export const WhiteContainer: FC<Props> = ({ children, style, className }) => {
  return (
    <div
      style={style}
      className={classNames(classes.whiteContainer, className)}>
      {children}
    </div>
  );
};
