import React from 'react'
import { Space, Table, Button } from 'antd';

const handleDelete = () => { }
const handleEdit = () => { }

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    rowScope: 'row',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Mật khẩu',
    dataIndex: 'password',
    key: 'password',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số điện thoại',
    key: 'phone',
    dataIndex: 'phone',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={handleEdit}>Sửa</Button>
        <Button onClick={handleDelete} danger>Xóa</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    id: '1234abcd',
    username: 'John Brown',
    password: 'Brown@123',
    address: 'New York',
    phone: '0388998283',
  },
  {
    key: '2',
    id: '9543abcd',
    username: 'Jim Green',
    password: 'Green@123',
    address: 'London',
    phone: '0388998283',
  },
  {
    key: '3',
    id: '1234degf',
    username: 'Joe Black',
    password: 'Black@123',
    address: 'Sydney',
    phone: '0388998283',
  },
];

const Supplies = () => {
  const handleCreate = () => { }
  return (
    <div className='Supplies'>
      <div className="container">
        <h1 className="heading">Vật tư và thiết bị</h1>
        <Button className='button-create' onClick={handleCreate}>Tạo</Button>
        <div className="Supplies__table">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  )
}

export default Supplies