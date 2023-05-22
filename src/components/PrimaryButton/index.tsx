import { FC } from 'react';
import { Button } from 'antd';

import classes from './PrimaryButton.module.scss';

type Props = {
  id: string;
  text?: string;
  onClick?: () => void;
  icon?: any;
  disabled?: boolean;
  htmlType?: 'reset' | 'button' | 'submit' | undefined;
};

export const PrimaryButton: FC<Props> = ({
  id,
  disabled = false,
  text,
  icon,
  onClick,
  htmlType,
}) => {
  return (
    <div className={classes.primaryButtonContainer}>
      <Button
        id={id}
        type={'primary'}
        icon={icon}
        disabled={disabled}
        htmlType={htmlType}
        onClick={() => {
          onClick && onClick();
        }}>
        {text && text}
      </Button>
    </div>
  );
};
