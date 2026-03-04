import type { RootState } from '@/store';
import {
  Button,
  Card,
  Col,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Table,
  Tree,
  type TableProps,
  type TreeDataNode,
  type TreeProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccountList, type AccountData, type MenuItem } from '../../api/users';
import useDataList from '../../hooks/useDataList';
import Permission from '../../utils/Permission';
import './index.scss';

interface FormData {
  accountName: string;
}

const initialFormData: FormData = {
  accountName: '',
};

const treeData: TreeDataNode[] = [
  {
    title: '工作台',
    key: '/dashboard',
  },
  {
    title: '租户管理',
    key: '/users',
    children: [
      {
        title: '租户列表',
        key: '/users/list',
      },
      {
        title: '新增租户',
        key: '/users/add',
      },
    ],
  },
  {
    title: '物业管理',
    key: '/estate',
    children: [
      {
        title: '楼宇管理',
        key: '/estate/tenement',
      },
      {
        title: '房间管理',
        key: '/estate/room',
      },
      {
        title: '车辆信息',
        key: '/estate/car',
      },
    ],
  },
  {
    title: '报修管理',
    key: '/repair',
  },
  {
    title: '财务管理',
    key: '/finance',
    children: [
      {
        title: '合同管理',
        key: '/finance/contract',
      },
      {
        title: '合同详情',
        key: '/finance/surrender',
      },
      {
        title: '账单管理',
        key: '/finance/bill',
      },
    ],
  },
  {
    title: '招商管理',
    key: '/merchants',
  },
  {
    title: '运营管理',
    key: '/operation',
    children: [
      {
        title: '运营总览',
        key: '/operation/all',
      },
      {
        title: '文章发布',
        key: '/operation/article',
      },
      {
        title: '内容评论',
        key: '/operation/comments',
      },
    ],
  },
  {
    title: '设备管理',
    key: '/equipment',
  },
  {
    title: '能源消耗',
    key: '/energy',
  },
  {
    title: '系统设置',
    key: '/settings',
  },
  {
    title: '个人中心',
    key: '/personal',
  },
];

const getCheckedKeys = (menuList: MenuItem[], result: string[] = []) => {
  let keys: string[] = [];
  menuList.forEach(item => {
    if (item.children && item.children.length) {
      const childKeys = getCheckedKeys(item.children, result);
      keys = keys.concat(childKeys);
    } else {
      keys.push(item.key);
    }
  });
  return keys;
};

function Settings() {
  const {
    loadData,
    formData,
    handleFormItemChange,
    page,
    pageSize,
    loading,
    dataList,
    total,
    handlePageConfigChange,
  } = useDataList<FormData, AccountData>(initialFormData, getAccountList);
  const { menuList } = useSelector((state: RootState) => state.auth);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [accountName, setAccountName] = useState<string>('');

  useEffect(() => {
    const res = getCheckedKeys(menuList);
    // eslint-disable-next-line
    setCheckedKeys(res);
    setAccountName(sessionStorage.getItem('username') || '');
  }, []);

  const columns: TableProps<AccountData>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: '账号名称',
      key: 'accountName',
      dataIndex: 'accountName',
    },
    {
      title: '所属权限',
      key: 'auth',
      dataIndex: 'auth',
    },
    {
      title: '使用人',
      key: 'person',
      dataIndex: 'person',
    },
    {
      title: '使用人电话',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '所属部门',
      key: 'department',
      dataIndex: 'department',
    },
    {
      title: '操作',
      key: 'operate',
      render(_value, record) {
        return (
          <>
            <Button type="primary" size="small" className="mr" onClick={() => handleEdit(record)}>
              修改权限
            </Button>
            <Permission permission={['delete']}>
              <Button type="primary" danger size="small">
                删除账号
              </Button>
            </Permission>
          </>
        );
      },
    },
  ];

  const handleConfirm = () => {
    console.log(checkedKeys);
  };

  const handleEdit = (account: AccountData) => {
    setAccountName(account.accountName);
    const keys = getCheckedKeys(account.menu);
    setCheckedKeys(keys);
  };

  const handleCheck: TreeProps['onCheck'] = checkedKeys => {
    setCheckedKeys(checkedKeys as string[]);
  };
  return (
    <div className="settings">
      <Card className="search">
        <Row gutter={16}>
          <Col span={8}>
            <Input
              name="accountName"
              value={formData.accountName}
              onChange={handleFormItemChange}
              placeholder="请输入账户名"
            />
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={() => loadData()}>
              搜索
            </Button>
          </Col>
          <Col span={8} className="jce">
            <Button type="primary">新建账号</Button>
          </Col>
        </Row>
      </Card>
      <Row gutter={16} className="mt">
        <Col span={8}>
          <Card title={`${accountName}:所拥权限`}>
            <Tree
              defaultExpandAll
              checkable
              treeData={treeData}
              checkedKeys={checkedKeys}
              onCheck={handleCheck}
            />
          </Card>
          <Card className="mt">
            <Popconfirm
              title="操作提示"
              description={`您确认要修改${accountName}用户的权限吗?`}
              okText="是"
              cancelText="否"
              onConfirm={handleConfirm}
            >
              <Button type="primary">提交修改</Button>
            </Popconfirm>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="账号列表" className="account-list">
            <Table
              loading={loading}
              dataSource={dataList}
              rowKey={record => record.id}
              columns={columns}
              pagination={false}
            />
            <Pagination
              className="fr mt mb"
              total={total}
              showQuickJumper
              onChange={handlePageConfigChange}
              current={page}
              pageSize={pageSize}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Settings;
