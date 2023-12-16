import React from 'react'
import TextDisplay from '../../../components/TextDisplay';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import showMessage from '../../../hooks/message-hooks';
import { useSelector } from 'react-redux';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { Button, Popconfirm, Space, Table } from 'antd';
import ModalUpdate from '../components/ModalUpdate';
import ModalAdd from '../components/ModalAdd';
import { deleteRoom, getListRoom } from '../api';
import { setLoading, setListRoom, setModalUpdate, setModalAdd } from '../store/roomSlice'

const Room = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const loading = useSelector((state) => state.room?.loading);
  let listRoom = useSelector((state) => state.room?.listRoom);

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    deleteRoom(id, axiosJWT, user?.accessToken).then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListRoom(res.data?.listRoom));
        showMessage().showSuccess(res.data?.message);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
  };
  const handleEdit = (record) => {
    dispatch(
      setModalUpdate({
        open: true,
        id: record?._id,
        name: record?.name,
        description: record?.description,
      }),
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <TextDisplay text={text} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setLoading(true));
    getListRoom().then((res) => {
      dispatch(setLoading(false));
      if (res.data?.success) {
        dispatch(setListRoom(res.data?.listRoom));
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = () => {
    dispatch(setModalAdd({ open: true }));
  };
  if (listRoom) {
    listRoom = listRoom.map((category, index) => {
      return {
        ...category,
        key: index + 1,
      };
    });
  }

  return (
    <div className="Category">
      <div className="container">
        <h1 className="heading box-shadow">Phòng ban</h1>
        <Button type='primary' className="button-create box-shadow" onClick={handleCreate}>
          Tạo
        </Button>
        <div className="Category__table">
          <Table
            loading={loading}
            columns={columns}
            dataSource={listRoom}
          />
        </div>
        <ModalUpdate />
        <ModalAdd />
      </div>
    </div>
  );
};

export default Room;
