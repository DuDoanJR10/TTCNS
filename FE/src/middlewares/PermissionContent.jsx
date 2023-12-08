import { Spin, Layout } from 'antd';
import routes from '../routes/routes';
import React, { Suspense } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const { Content } = Layout;

const PermissionContent = () => {
  let access = true;

  // Check permissions

  return access ? (
    <Routes>
      {routes.map((route, idx) => {
        return (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<Spin />}>
                  <Content className='bg-white'>
                    <route.element />
                  </Content>
                </Suspense>
              }
            />
          )
        );
      })}
    </Routes>
  ) : (
    <Navigate to="/" />
  );
};

export default PermissionContent;
