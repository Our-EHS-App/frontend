import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface RouteGuardProps {
  component: JSX.Element;
  title?: string;
  allowAccess?: boolean;
}

export const PublicRoute = ({ component, title }: RouteGuardProps) => {
  const { t } = useTranslation();

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
