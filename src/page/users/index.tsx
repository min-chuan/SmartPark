import {
  Button,
  Card,
  Col,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Table,
  Tag,
  type TableProps,
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  batchDeleteUser,
  deleteUser,
  getUserList,
  type GetUserListRequest,
  type UserData,
} from '../../api/userList';
import { clearUserData, setUserData } from '../../store/user/userSlice';
import UserForm from './userForm';

type SearchType = Omit<GetUserListRequest, 'page' | 'pageSize'>;
const initialForm: SearchType = {
  company: '',
  contact: '',
  tel: '',
};

function Users() {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [form, setForm] = useState<SearchType>(initialForm);
  const [modalTitle, setModalTitle] = useState<string>('新增客户');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const columns: TableProps<UserData>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: '客户名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      render(value) {
        if (value == 1) {
          return <Tag color="green">经营中</Tag>;
        } else if (value == 2) {
          return <Tag color="#f50">暂停营业</Tag>;
        } else if (value == 3) {
          return <Tag color="red">已关闭</Tag>;
        }
      },
    },
    {
      title: '联系电话',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '所属行业',
      key: 'business',
      dataIndex: 'business',
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: '统一信用代码',
      key: 'creditCode',
      dataIndex: 'creditCode',
    },
    {
      title: '工商注册号',
      key: 'industryNum',
      dataIndex: 'industryNum',
    },
    {
      title: '组织结构代码',
      key: 'organizationCode',
      dataIndex: 'organizationCode',
    },
    {
      title: '法人名',
      key: 'legalPerson',
      dataIndex: 'legalPerson',
    },
    {
      title: '操作',
      key: 'operate',
      render(_value, record) {
        return (
          <>
            <Button type="primary" size="small" className="mr" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Popconfirm
              title="删除确认"
              description="确定要删除吗？"
              okText="是"
              cancelText="否"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" danger size="small">
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEdit = (user: UserData) => {
    setModalTitle('编辑客户');
    setIsModalOpen(true);
    dispatch(setUserData(user));
  };

  const handleAdd = () => {
    setModalTitle('新增客户');
    setIsModalOpen(true);
    dispatch(clearUserData());
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser({ id });
      message.success(res.data);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBatchDelete = async () => {
    try {
      const res = await batchDeleteUser({ ids: selected as string[] });
      message.success(res.data);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    loadData(page, pageSize);
  };

  const handleReset = () => {
    setSelected([]);
    setForm(initialForm);
    setPage(1);
    setPageSize(10);
    loadData(1, 10, initialForm);
  };

  const loadData = useCallback(
    async (
      currentPage: number = page,
      currentPageSize: number = pageSize,
      currentForm: SearchType = form
    ) => {
      setLoading(true);
      try {
        const res = await getUserList({
          ...currentForm,
          page: currentPage,
          pageSize: currentPageSize,
        });
        setLoading(false);
        setSelected([]);
        if (res.data) {
          const { total, list } = res.data;
          setTotal(total);
          setUserList(list);
        }
      } catch (err) {
        setLoading(false);
        setSelected([]);
        console.log(err);
      }
    },
    [page, pageSize, form]
  );

  useEffect(() => {
    loadData();
  }, []);

  const disabled = useMemo(() => {
    return selected.length < 1;
  }, [selected]);

  const rowSelection: TableProps<UserData>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys);
    },
    selectedRowKeys: selected,
  };

  return (
    <div className="users">
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>企业名称：</p>
            <Input name="company" value={form.company} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系人：</p>
            <Input name="contact" value={form.contact} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系电话：</p>
            <Input name="tel" value={form.tel} onChange={handleChange} />
          </Col>
          <Col span={3}>
            <Button type="primary" className="mr" onClick={() => loadData()}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt tr">
        <Button type="primary" className="mr" onClick={handleAdd}>
          新增企业
        </Button>
        <Button type="primary" danger disabled={disabled} onClick={handleBatchDelete}>
          批量删除
        </Button>
      </Card>
      <Card className="clearfix mt">
        <Table
          columns={columns}
          dataSource={userList}
          rowKey={record => record.id}
          loading={loading}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Pagination
          className="fr mt mb"
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共 ${total} 条`}
          onChange={handlePageChange}
          current={page}
          pageSize={pageSize}
        />
      </Card>
      <UserForm
        title={modalTitle}
        visible={isModalOpen}
        hideModal={hideModal}
        lodaData={loadData}
      />
    </div>
  );
}
export default Users;
