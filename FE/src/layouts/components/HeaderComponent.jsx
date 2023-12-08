import React, { useState } from 'react';
import '../styles/Header.scss';
import { Layout, Input, Space, Button, Dropdown } from 'antd';
import Auth from '../../pages/Auth/views/Auth';
import { useSelector } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { logoutFailed, logoutStart, logoutSuccess } from '../../pages/Auth/store/authSlice';
import { logout } from '../../pages/Auth/api';
// import showMessage from '../../hooks/message-hooks';
// import { deleteCookie } from '../../helpers/funcs';
import createAxios from '../../utils/createAxios';
import showMessage from '../../hooks/message-hooks';
import { deleteCookie } from '../../helpers/funcs';

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, logoutSuccess);  

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      const data = await logout(axiosJWT, user.accessToken, user._id);
      if (data?.success) {
        dispatch(logoutSuccess());
        showMessage().showSuccess(data?.message);
        deleteCookie(process.env.REACT_APP_ACCESS_TOKEN_KEY);
        deleteCookie(process.env.REACT_APP_REFRESH_TOKEN_KEY);
      } else {
        if (data?.expired) {
          dispatch(logoutSuccess());
          showMessage().showError(data.message);
        } else {
          dispatch(logoutFailed());
          showMessage().showError(data.message);
        }
      }
    } catch (error) {
      dispatch(logoutFailed())
      console.log(error);
    }
  };
  
  const onSearch = () => {};

  const items = [{ key: '0', label: <p onClick={handleLogout}>Đăng xuất</p> }];
  const showModalLogin = () => {
    setType(true);
    setOpen(true);
  };

  const showModalRegister = () => {
    setType(false);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Header className="Header flex bg-[#ecfeff] h-[60px] p-0">
        <div className="container flex justify-between">
          <div className="Header__search flex items-center">
            <Search
              placeholder="Tìm kiếm"
              allowClear
              onSearch={onSearch}
              className="w-[400px]"
            />
          </div>
          <div className="Header__auth flex items-center">
            {user?.username ? (
              <Dropdown menu={{ items }}>
                <Button
                  className="text-black !h-10 flex items-center"
                  type="primary"
                  icon={<FaCircleUser className="text-2xl" />}
                >
                  {user.username}
                </Button>
              </Dropdown>
            ) : (
              <Space>
                <Button
                  onClick={showModalLogin}
                  className="border-[#16405b] border-[2px]"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={showModalRegister}
                  className="border-[#16405b] border-[2px]"
                >
                  Đăng ký
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Header>
      <Auth
        showModalRegister={showModalRegister}
        showModalLogin={showModalLogin}
        type={type}
        open={open}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default HeaderComponent;
