import { FC, Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, Empty, notification, ThemeConfig } from 'antd';
import { FullScreenLoading } from '../components/Loading/index';
import { useTranslation } from 'react-i18next';
import { FCProps } from '../interfaces/ICommon';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
export const Providers: FC<FCProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { dir, language } = i18n;

  const customEmpty = () => {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('NO_DATA')} />
    );
  };
  useEffect(() => {
    document.body.dir = dir(language);
    document.dir = dir(language);
    notification.config({
      rtl: language === 'ar',
      duration: 1.5,
      placement: 'top',
    });
  }, [language]);

  const antDTheme: ThemeConfig = {
    token: {
      fontFamily: `'Univers Next Arabic', 'UniversNextArabic', -apple-system,
  BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
      colorPrimary: '#2D3982',
      colorLink: '#00b9ad',
      borderRadius: 2,
      colorBgLayout: '#f7f7f7',
    },
    components: {
      Layout: {
        colorBgHeader: '#081553',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        controlHeight: 'auto',
      },
      Table: {
        borderRadius: 4,
      },
    },
  };
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          direction={i18n.dir(i18n.language)}
          theme={antDTheme}
          renderEmpty={customEmpty}>
            {children}
        </ConfigProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
