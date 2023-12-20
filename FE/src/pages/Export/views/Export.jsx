import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAxios from '../../../utils/createAxios';
import { loginSuccess } from '../../Auth/store/authSlice';
import { getListExport } from '../api';
import showMessage from '../../../hooks/message-hooks';
import TextDisplay from '../../../components/TextDisplay';

const Export = () => {
  const [listExport, setListExport] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    setLoading(true);
    getListExport(user?.accessToken, axiosJWT).then((res) => {
      setLoading(false);
      if (res.data?.success) {
        setListExport(res.data?.listExport);
      } else {
        console.log(res.data?.error);
        showMessage().showError(res.data?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      title: 'Tên phiếu xuất',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <TextDisplay text={text} />,
    },
    {
        title: 'Ngày xuất',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <TextDisplay text={text} />,
    }, 
    {
        title: 'Nhân viên nhận',
        dataIndex: 'staff',
        key: 'staff',
        render: (text) => <TextDisplay text={text} />,
    }
  ];
  let customList = []
  if (listExport) {
    customList = listExport.map((supplies, index) => {
      return {
        ...supplies,
        key: index + 1,
        staff: supplies?.staff?.name,
      };
    });
  }

  return (
    <div className="Export">
      <div className="container">
        <h1 className="heading box-shadow">Phiếu xuất</h1>
        <Table
          pagination={{ position: ['bottomCenter'] }}
          loading={loading}
          columns={columns}
          dataSource={customList}
        />
      </div>
    </div>
  );
};

export default Export;
