import classes from './NotAuthorizedPage.module.scss';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import React from 'react';

export const NotAuthorizedPage: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.notAllowedContainer, classes.notAllowed)}>
        <CloseCircleOutlined style={{ fontSize: 48, color: 'red' }} />
        <h5 style={{ textAlign: 'center' }}>{t('NOT_AUTHORIZED.DETAILS')}</h5>
        <Button>{t('LAYOUT.LOGOUT')}</Button>
      </div>
    </div>
  );
};
