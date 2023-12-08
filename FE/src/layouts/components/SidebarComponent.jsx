import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.scss';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHouse,
  FaCircleUser,
  FaDatabase,
  FaLayerGroup,
} from 'react-icons/fa6';

const menuTop = [
  {
    key: 0,
    label: <Link to='/'>Trang chủ</Link>,
    icon: <FaHouse />,
  },
  {
    key: 1,
    label: <Link to='/category'>Danh mục</Link>,
    icon: <FaLayerGroup />,
  },
  {
    key: 2,
    label: <Link to='/supplies'>Vật tư và thiết bị</Link>,
    icon: <FaDatabase />,
  },
  {
    key: 3,
    label: <Link to="/account">Tài khoản</Link>,
    icon: <FaCircleUser />,
  },
];

const redirectLinks = ['/', '/category', '/supplies', '/account'];

const SidebarComponent = ({ className }) => {
  const location = useLocation();
  const [active, setActive] = useState(redirectLinks.findIndex((link) => link === location.pathname).toString());

  useEffect(() => {
    setActive(
      redirectLinks.findIndex((link) => link === location.pathname).toString(),
    );
  }, [location.pathname]);

  return (
    <div
      className={`${className} Sidebar shrink-0 min-h-screen bg-[#a5f3fc] text-white w-[245px]`}
    >
      <div className="flex min-h-screen w-full flex-col justify-between h-full">
        <div className="min-h-screen h-full">
          <Link to="/" className="block">
            <p className="Sidebar__logo text-black ml-5 text-3xl leading-[44px] py-2">
              Hồng Ngọc
            </p>
          </Link>
          <Menu
            className="min-h-screen h-full bg-[#a5f3fc]"
            mode="vertical"
            items={menuTop}
            selectedKeys={active}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
