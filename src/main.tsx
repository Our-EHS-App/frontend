import { Providers } from './context';
import { createRoot } from 'react-dom/client';
import 'dayjs/locale/ar-sa.js';
import './i18n';
import 'antd/dist/reset.css';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import 'chart.js/auto';

import { useRouterLinks } from './hooks/useRouterLinks';
import React from 'react';

const container = document.getElementById('root');

const root = createRoot(container!);
const App = () => {
  const { router } = useRouterLinks();
  return <RouterProvider router={router} />;
};

root.render(
  <Providers>
    <App />
  </Providers>
);
