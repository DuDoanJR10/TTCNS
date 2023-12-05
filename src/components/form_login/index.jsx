import { Button, Checkbox, Form, Input } from 'antd';
import './styles.scss';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Form_login = () => {
  return (
    <div className="top">
      <h1>Đăng nhập</h1>
      <Form
        className="form_login"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            style={{
              width: '150%',
              borderColor: '#dbdbdb',
              backgroundColor: '#fafafa',
            }}
            placeholder="Số điện thoại, tên người dùng hoặc email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            style={{
              width: '150%',
              borderColor: '#dbdbdb',
              backgroundColor: '#fafafa',
            }}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            style={{
              backgroundColor: '#4cb5f9',
              width: '150%',
              transform: ' translateX(-95px)',
            }}
            type="primary"
            htmlType="submit"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Form_login;
