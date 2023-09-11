import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/Layout';
import { PrivateRoute } from '../routes/PrivateRoute';
import { LoginPage } from '../pages/Login';
import { NotAuthorizedPage } from '../pages/NotAuthorized';
import { ListOfForms } from '../pages/ListOfForms';
import { CreateBasicSection } from '../pages/CreateBasicSection';
import { AppNotFound } from '../pages/AppNotFound';
import React from 'react';
import { Dashboards } from '../pages/Dashboards';
import { ListOfMyForms } from '../pages/ListOfMyForms';
import { ListOfInspections } from '../pages/ListOfInspections';
import { FillingForm } from '../pages/FillingForm';

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
          path: 'templates-list',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<ListOfForms />}
                />
              ),
            },
          ],
        },
        {
          path: 'Dashboards',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<Dashboards />}
                />
              ),
            },
          ],
        },
        {
          path: 'my-templates-list',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<ListOfMyForms />}
                />
              ),
            },
          ],
        },
        {
          path: 'inspections',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<ListOfInspections />}
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
                  title={'TITLE.EMTIITHAL'}
                  component={<CreateBasicSection />}
                />
              ),
            },
          ],
        },
        {
          path: 'template/:formId',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<FillingForm mode={'VIEW'} />}
                />
              ),
            },
          ],
        },
        {
          path: 'form/fill/:formId',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<FillingForm mode={'FILL'} />}
                />
              ),
            },
          ],
        },
        {
          path: 'form/fill-template/:formId',
          children: [
            {
              index: true,
              element: (
                <PrivateRoute
                  title={'TITLE.EMTIITHAL'}
                  component={<FillingForm mode={'FILLTM'} />}
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
          element: <Navigate to={'/templates-list'} replace />,
        },
        {
          path: '/',
          element: <Navigate to={'/templates-list'} replace />,
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
