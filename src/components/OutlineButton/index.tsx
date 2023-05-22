import { FC } from 'react';
import { Button } from 'antd';
import classNames from 'classnames';

import classes from './OutlineButton.module.scss';

type Props = {
  id: string;
  text: string;
  onClick?: () => void;
  icon?: any;
  className?: string;
};

export const OutlineButton: FC<Props> = ({
  id,
  text,
  icon,
  onClick,
  className,
}) => {
  return (
    <div className={classNames(classes.outlineButtonContainer, className)}>
      <Button
        id={id}
        icon={icon}
        onClick={() => {
          onClick && onClick();
        }}>
        {text}
      </Button>
    </div>
  );
};
