import React from 'react';
import '../styles/Home.scss';
import { DribbbleOutlined, FacebookOutlined, SkypeOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { Search } = Input;


const Home = () => {
  return (
    <div className="home">
      <h1 className='home__heading'>Trang Chủ</h1>
      <Search
        placeholder="Tìm kiếm vật tư"
        className='home__search'
      />

      <div className="home__list">
        <div className="home__list__item">
          <div className="item__icon"><DribbbleOutlined /></div>
          <p className='item__title'>Vật tư 1</p>
        </div>
        <div className="home__list__item">
          <div className="item__icon"><FacebookOutlined /></div>
          <p className='item__title'>Vật tư 2</p>
        </div>
        <div className="home__list__item">
          <div className="item__icon"><YoutubeOutlined /></div>
          <p className='item__title'>Vật tư 3</p>
        </div>
        <div className="home__list__item">
          <div className="item__icon"><SkypeOutlined /></div>
          <p className='item__title'>Vật tư 4</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
