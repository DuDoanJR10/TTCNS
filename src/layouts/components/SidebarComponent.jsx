import React, { useState } from 'react';
import '../styles/Sidebar.scss';
import { Menu } from 'antd';
import { SketchOutlined, HeatMapOutlined, ChromeOutlined, CodepenOutlined } from '@ant-design/icons';


const SidebarComponent = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuTop = [
    {
      key: 1,
      label: 'Trang chủ',
      icon: <SketchOutlined />,
    },
    {
      key: 2,
      label: 'Tài khoản',
      icon: <ChromeOutlined />,
    },
    {
      key: 3,
      label: 'Vật tư và thiết bị',
      icon: <CodepenOutlined />,
    },
    {
      key: 4,
      label: 'Danh mục',
      icon: <HeatMapOutlined />,
    },
    // {
    //   key: 5,
    //   label: t('sider.messages'),
    //   icon: <IconMessenger />,
    // },
    // {
    //   key: 7,
    //   label: t('sider.notifications'),
    //   icon: <IconNotifications />,
    // },
    // {
    //   key: 8,
    //   label: t('sider.create'),
    //   icon: <IconNewPost />,
    // },
    // {
    //   key: 9,
    //   label: t('sider.profile'),
    //   icon: <IconNewPost />,
    // },
  ];

  const onClick = (e) => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{ width: '245px' }}
      className={`${className} min-h-screen !bg-white text-white`}
    >
      <div className="flex min-h-screen w-full flex-col justify-between" style={{ minHeight: '100vh' }}>
        <div style={{ minHeight: '100vh' }}>
          <Menu
            style={{ minHeight: '100vh' }}
            onClick={onClick}
            mode="vertical"
            items={menuTop}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
