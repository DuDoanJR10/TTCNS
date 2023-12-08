import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import '../styles/DefaultLayout.scss';
import { Navigate } from 'react-router-dom';
import PermissionContent from '../../middlewares/PermissionContent';

const Sidebar = React.lazy(() => import('../components/SidebarComponent'));
const Footer = React.lazy(() => import('../components/FooterComponent'));
const Header = React.lazy(() => import('../components/HeaderComponent'));

const loading = () => <Spin />;

const DefaultLayout = () => {

  return true ? (
    <Layout className='min-h-screen flex-row'>
      <Suspense fallback={loading()}>
        <Sidebar />
      </Suspense>
      <Layout>
        <Suspense fallback={loading()}>
          <Header />
          <PermissionContent />
          <Footer />
        </Suspense>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default DefaultLayout;
