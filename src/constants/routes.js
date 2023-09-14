import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const Phonebook = lazy(() => import('pages/Phonebook'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));

export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';

export const appRoutes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <Phonebook />
      </PrivateRoute>
    ),
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <Register />
      </RestrictedRoute>
    ),
  },
];
