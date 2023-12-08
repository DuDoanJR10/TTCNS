import React from 'react';
import '../styles/Register.scss';
import { Button, Input, Form, Radio } from 'antd';
import showMessage from '../../../hooks/message-hooks';
import { register } from '../api';
import { useDispatch } from 'react-redux';
import { registerFailed, registerStart, registerSuccess } from '../store/authSlice';

const { TextArea } = Input;

const Register = ({ showModalLogin, handleCancel }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const newUser = {
      ...values,
      username: values.username.trim(),
      password: values.password.trim(),
      address: values.address.trim(),
    };
    dispatch(registerStart());
    try {
      const data = await register(newUser);
      if (data.success) {
        handleCancel();
        form.resetFields();
        dispatch(registerSuccess());
        showMessage().showSuccess(data.message);
      } else {
        dispatch(registerFailed());
        showMessage().showError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatorWhiteSpace = (rule, value, callback) => {
    if (value && value.trim() === '') {
      callback('Vui lòng nhập tên người dùng hợp lệ không có dấu cách ở đầu!');
    } else {
      callback();
    }
  };
  return (
    <div className="Register">
      <h2 className="Register__title text-center text-4xl leading-normal font-bold">
        Đăng ký
      </h2>
      <Form
        className="Register__form"
        name="register-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: 'Vui lòng nhập tên người dùng!' },
            { max: 12, message: 'Tên người dùng tối đa 12 ký tự!' },
            {
              validator: validatorWhiteSpace,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu ít nhất gồm 6 ký tự!' },
            { max: 16, message: 'Mật khẩu tối đa 16 ký tự!' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ!' },
            { max: 250, message: 'Địa chỉ tối đa 250 ký tự!' },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
            {
              pattern: /^\d{10}$/, // Biểu thức chính quy cho 10 chữ số
              message: 'Vui lòng nhập số điện thoại gồm 10 chữ số!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" initialValue="user">
          <Radio.Group defaultValue="user" size="large">
            <Radio.Button value="user">Người dùng</Radio.Button>
            <Radio.Button value="admin">Người quản trị</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button
          className="block px-0 mb-2"
          type="link"
          onClick={showModalLogin}
        >
          Bạn đã có tài khoản? Đăng nhập ngay!
        </Button>
        <Form.Item>
          <Button
            className="m-auto flex text-black"
            type="primary"
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
