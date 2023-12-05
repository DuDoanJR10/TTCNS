import React from 'react';
import configs from '../configs';

const Home = React.lazy(() => import('../pages/Home/views/Home'));
const User = React.lazy(() => import('../pages/User/views/User'));

const routes = [
  {
    path: configs.routes.home,
    exact: true,
    element: Home,
  },
  {
    path: configs.routes.user,
    exact: true,
    element: User,
    footer: true,
  },
];

export default routes;
