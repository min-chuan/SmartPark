import { getContractList, type ContractData } from '@/api/contract';
import type { RootState } from '@/store';
import { Button, Card, Col, Input, Pagination, Row, Table, Tag } from 'antd';
import type { TableProps } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  initialFormData,
  setData,
  setFormData,
  setPage,
  setPageSize,
  setTotal,
  type SearchType,
} from '../../store/finance/contractSlice';

function Contract() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, total, page, pageSize, formData } = useSelector(
    (state: RootState) => state.contract
  );

  const [searchParams] = useSearchParams();

  const columns: TableProps<ContractData>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render: (_value, _record, index) => {
        return 1 + index;
      },
    },
    {
      title: '合同编号',
      key: 'contractNo',
      dataIndex: 'contractNo',
    },
    {
      title: '合同类别',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '合同名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '合同开始日期',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      title: '合同结束日期',
      key: 'endDate',
      dataIndex: 'endDate',
    },
    {
      title: '甲方',
      key: 'jia',
      dataIndex: 'jia',
    },
    {
      title: '乙方',
      key: 'yi',
      dataIndex: 'yi',
    },
    {
      title: '审批状态',
      key: 'status',
      dataIndex: 'status',
      render: value => {
        if (value === '1') {
          return <Tag>未审批</Tag>;
        } else if (value === '2') {
          return <Tag color="green">审批通过</Tag>;
        } else if (value === '3') {
          return <Tag color="red">审批拒绝</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'operate',
      render: (_value, record) => {
        return (
          <Button type="primary" size="small" onClick={() => handleDetail(record.contractNo)}>
            合同详情
          </Button>
        );
      },
    },
  ];

  const loadData = async (
    currentPage: number = page,
    currentPageSize: number = pageSize,
    currentFormData: SearchType = formData
  ) => {
    try {
      setLoading(true);
      const res = await getContractList({
        ...currentFormData,
        page: currentPage,
        pageSize: currentPageSize,
      });
      setLoading(false);
      if (res.data) {
        const { list, total } = res.data;
        dispatch(setData(list));
        dispatch(setTotal(total));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!data.length || !searchParams.get('return') === true) {
      // eslint-disable-next-line
      loadData();
    }
  }, []);

  const handleDetail = (contractNo: string) => {
    navigate(`/finance/surrender?contractNo=${contractNo}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
    loadData(page, pageSize);
  };

  const handleReset = () => {
    dispatch(setFormData(initialFormData));
    dispatch(setPage(1));
    dispatch(setPageSize(10));
    loadData(1, 10, initialFormData);
  };

  return (
    <div className="contract">
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>合同编号：</p>
            <Input name="contractNo" value={formData.contractNo} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系人：</p>
            <Input name="person" value={formData.person} onChange={handleChange} />
          </Col>
          <Col span={7}>
            <p>联系电话：</p>
            <Input name="tel" value={formData.tel} onChange={handleChange} />
          </Col>
          <Col span={3}>
            <Button type="primary" className="mr" onClick={() => loadData()}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="clearfix mt">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={record => record.contractNo}
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
    </div>
  );
}

export default Contract;
