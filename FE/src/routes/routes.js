import React from 'react';
import configs from '../configs';

const Home = React.lazy(() => import('../pages/Home/views/Home'));
const Category = React.lazy(() => import('../pages/Category/views/Category'));
const Supplies = React.lazy(() => import('../pages/Supplies/views/Supplies'));
const NotPage = React.lazy(() => import('../pages/NotPage/views/NotPage'));
const Account = React.lazy(() => import('../pages/Account/views/Account'));

const routes = [
  {
    path: configs.routes.home,
    exact: true,
    element: Home,
  },
  {
    path: configs.routes.category,
    exact: true,
    element: Category,
    footer: true,
  },
  {
    path: configs.routes.supplies,
    exact: true,
    element: Supplies,
    footer: true,
  },
  {
    path: configs.routes.account,
    exact: true,
    element: Account,
    footer: true,
  },
  {
    path: configs.routes.notPage,
    exact: true,
    element: NotPage,
    footer: true,
  },
];

export default routes;
