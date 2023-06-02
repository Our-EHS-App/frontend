import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/Layout';
import { PrivateRoute } from '../routes/PrivateRoute';
import { LoginPage } from '../pages/Login';
import { NotAuthorizedPage } from '../pages/NotAuthorized';
import { ListOfForms } from '../pages/ListOfForms';
import { CreateBasicSection } from '../pages/CreateBasicSection';
import { AppNotFound } from '../pages/AppNotFound';
import React from 'react';

export const useRouterLinks = () => {
  const routerObjects: RouteObject[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'unauthorized',
          element: (
            <PrivateRoute
              title={'unauthorized'}
              component={<NotAuthorizedPage />}
            />
          ),
        },
        {
          path: 'form-list',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.FORMS_LIST'}
                  component={<ListOfForms />}
                />
              ),
            },
          ],
        },
        {
          path: 'form-create',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.FORMS_LIST'}
                  component={<CreateBasicSection />}
                />
              ),
            },
          ],
        },
        {
          path: '404',
          element: <PrivateRoute component={<AppNotFound />} />,
        },
        {
          path: '*',
          element: <Navigate to={'/form-list'} replace />,
        },
        {
          path: '/',
          element: <Navigate to={'/form-list'} replace />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
  ];
  const router = createBrowserRouter(routerObjects);

  return { router };
};
