import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import { MainLayout } from '@components';
import { PrivateRoute } from '../routes/PrivateRoute';
import { LoginPage } from '@pages';
import { NotAuthorizedPage } from '../pages/NotAuthorized';
import { ListOfForms } from '../pages/ListOfForms';
import { CreateBasicSection } from '../pages/CreateBasicSection';
import { AppNotFound } from '../pages/AppNotFound';

export const useRouterLinks = () => {
  const routerObjects: RouteObject[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
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
            {
              path: ':uuid/create',
              index: true,
              element: <PrivateRoute component={<CreateBasicSection />} />,
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
          element: <Navigate to={'/'} replace />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routerObjects);

  return { router };
};
