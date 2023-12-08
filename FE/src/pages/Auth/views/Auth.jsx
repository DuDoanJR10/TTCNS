import React from 'react'
import '../styles/Auth.scss';
import { Modal } from 'antd';
import Login from '../components/Login';
import Register from '../components/Register';

const animeLogin = require('../../../assets/images/anime-login.png');
const animeRegister = require('../../../assets/images/anime-register.png');

const Auth = ({ open, handleCancel, type, showModalRegister, showModalLogin }) => {
    return (
        <div className='Auth'>
            <Modal
                centered
                className='Auth__modal relative'
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                {type ? <Login handleCancel={handleCancel} showModalRegister={showModalRegister} /> : <Register handleCancel={handleCancel} showModalLogin={showModalLogin} />}
                <img className={`absolute h-[300px] ${type ? 'top-[154px] right-[-123px]' : 'top-[300px] right-[-145px]'}`} src={type ? animeLogin : animeRegister} alt="Anime Auth" />
            </Modal>
        </div>
    )
}

export default Auth