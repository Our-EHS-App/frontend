import { ExoticComponent, FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteGuardProps {
  component: JSX.Element;
  title?: string;
}

export const PrivateRoute: FC<RouteGuardProps> = ({
  component,
  title,
}: RouteGuardProps) => {
  const { t } = useTranslation();

  if (!localStorage.getItem('token')) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        {title && <title>{t(title)}</title>}
      </Helmet>
      {component}
    </>
  );
};
