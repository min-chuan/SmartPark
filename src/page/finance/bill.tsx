import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  type TableProps,
} from 'antd';
import type { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { getBillList, type BillData, type GetBillListRequest } from '../../api/contract';
import exportToExcel from '../../utils/exportToExcel';
const { RangePicker } = DatePicker;

type DateType = [start: Dayjs | null, end: Dayjs | null] | null;

interface SearchType extends Omit<
  GetBillListRequest,
  'startDate' | 'endDate' | 'page' | 'pageSize'
> {
  dates: DateType;
}

const initialFormData: SearchType = {
  no: '',
  dates: null,
  status: '',
};

function Bill() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [billList, setBillList] = useState<BillData[]>([]);
  const [formData, setFormData] = useState<SearchType>(initialFormData);
  const [selectedRows, setSelectedRows] = useState<BillData[]>([]);

  const columns: TableProps<BillData>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_value, _record, index) {
        return index + 1;
      },
      width: 100,
      fixed: 'left',
    },
    {
      title: '账单号',
      key: 'accountNo',
      dataIndex: 'accountNo',
      width: 150,
    },
    {
      title: '缴费状态',
      dataIndex: 'status',
      render(value) {
        if (value == 1) {
          return <Tag color="green">已缴费</Tag>;
        } else if (value == 2) {
          return <Tag color="red">未缴费</Tag>;
        }
      },
      width: 100,
    },
    {
      title: '房屋号',
      key: 'roomNo',
      dataIndex: 'roomNo',
      width: 100,
    },
    {
      title: '车位号',
      key: 'carNo',
      dataIndex: 'carNo',
      width: 100,
    },
    {
      title: '手机号',
      key: 'tel',
      dataIndex: 'tel',
      width: 150,
    },
    {
      title: '物业费(年)',
      key: 'costName1',
      dataIndex: 'costName1',
      width: 150,
    },
    {
      title: '车位费',
      key: 'costName2',
      dataIndex: 'costName2',
      width: 150,
    },
    {
      title: '房屋租金',
      key: 'costName3',
      dataIndex: 'costName3',
      width: 150,
    },
    {
      title: '开始时间',
      key: 'startDate',
      dataIndex: 'startDate',
      width: 150,
    },
    {
      title: '结束时间',
      key: 'endDate',
      dataIndex: 'endDate',
      width: 150,
    },
    {
      title: '优惠金额',
      key: 'preferential',
      dataIndex: 'preferential',
      width: 150,
    },
    {
      title: '合计应收金额',
      key: 'money',
      dataIndex: 'money',
      width: 150,
    },
    {
      title: '支付方式',
      key: 'pay',
      dataIndex: 'pay',
      width: 120,
    },
    {
      title: '操作',
      width: 230,
      key: 'operate',
      fixed: 'right',
      render() {
        return (
          <>
            <Button type="primary" size="small" className="mr">
              打印
            </Button>
            <Popconfirm title="删除确认" description="确定要删除吗？" okText="是" cancelText="否">
              <Button type="primary" danger size="small" className="mr">
                账单作废
              </Button>
            </Popconfirm>
            <Button size="small">退款</Button>
          </>
        );
      },
    },
  ];

  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], seletedRows: BillData[]) => {
      console.log(selectedRowKeys);
      setSelected(selectedRowKeys as string[]);
      setSelectedRows(seletedRows);
    },
    selectedRowKeys: selected,
  };

  const transformDate = (dates: DateType): { startDate: string; endDate: string } => {
    const res = {
      startDate: '',
      endDate: '',
    };
    if (!dates) {
      return res;
    }
    if (dates[0]) {
      res.startDate = dates[0].format('YYYY-MM-DD');
    }
    if (dates[1]) {
      res.endDate = dates[1].format('YYYY-MM-DD');
    }
    return res;
  };

  const loadData = async (
    currentPage: number = page,
    currentPageSize: number = pageSize,
    currentFormData: SearchType = formData
  ) => {
    try {
      setLoading(true);
      const dates = transformDate(currentFormData.dates);
      const res = await getBillList({
        page: currentPage,
        pageSize: currentPageSize,
        no: currentFormData.no,
        status: currentFormData.status,
        ...dates,
      });
      setLoading(false);
      setSelected([]);
      setSelectedRows([]);
      if (res.data) {
        const { list, total } = res.data;
        setBillList(list);
        setTotal(total);
      }
    } catch (err) {
      setLoading(false);
      setSelected([]);
      setSelectedRows([]);
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    loadData();
  }, []);

  const handleExport = () => {
    exportToExcel(selectedRows, [
      'accountNo',
      'status',
      'roomNo',
      'carNo',
      'tel',
      'costName1',
      'costName2',
      'costName3',
      'startDate',
      'endDate',
      'preferential',
      'money',
      'pay',
    ]);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    loadData(page, pageSize);
  };

  const handleReset = () => {
    setSelected([]);
    setSelectedRows([]);
    setFormData(initialFormData);
    setPage(1);
    setPageSize(10);
    loadData(1, 10, initialFormData);
  };

  const handleDateChange = (dates: DateType) => {
    setFormData(prev => ({
      ...prev,
      dates,
    }));
  };

  const handleNoChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = e => {
    setFormData(prev => ({
      ...prev,
      no: e.target.value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value,
    }));
  };

  const disabled = useMemo(() => {
    return selected.length < 1;
  }, [selected]);

  return (
    <div className="bill">
      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="应收帐单金额" value={16876.38} />
          </Col>
          <Col span={6}>
            <Statistic title="已缴账单金额" value={6952.0} precision={2} />
          </Col>
          <Col span={6}>
            <Statistic title="已退帐单金额" value={2355.23} />
          </Col>
          <Col span={6}>
            <Statistic title="未缴帐单金额" value={9962.0} precision={2} />
          </Col>
        </Row>
      </Card>
      <Card className="mt search">
        <Row gutter={16}>
          <Col span={6}>
            <p>账单日期:</p>
            <RangePicker
              className="w100"
              format="YYYY-MM-DD"
              value={formData.dates}
              onChange={handleDateChange}
            />
          </Col>
          <Col span={6}>
            <p>房/车号:</p>
            <Input
              value={formData.no}
              placeholder="请输入门牌号或车位号"
              onChange={handleNoChange}
            />
          </Col>
          <Col span={6}>
            <p>缴费情况:</p>
            <Select
              className="w100"
              value={formData.status}
              onChange={handleStatusChange}
              options={[
                { value: '', label: '全部' },
                { value: '1', label: '已缴纳' },
                { value: '2', label: '未缴纳' },
              ]}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" className="mr" onClick={() => loadData()}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Button
          disabled={disabled}
          icon={<DownloadOutlined />}
          type="primary"
          className="mr"
          onClick={() => handleExport()}
        >
          导出为excel
        </Button>
        <Button disabled={disabled} type="primary" danger icon={<DeleteOutlined />}>
          批量作废
        </Button>
      </Card>
      <Card className="mt clearfix">
        <Table
          loading={loading}
          columns={columns}
          dataSource={billList}
          rowSelection={rowSelection}
          pagination={false}
          rowKey={record => record.accountNo}
          scroll={{ x: 1200 }}
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

export default Bill;
