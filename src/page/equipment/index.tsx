import { Button, Card, Col, Input, Pagination, Row, Table, Tag, type TableProps } from 'antd';
import {
  getEquipmentList,
  type EquipmentData,
  type GetEquipmentListRequest,
} from '../../api/equipment';
import useDataList from '../../hooks/useDataList';
import type { WithoutPageConfig } from '../../utils/utilityTypes';

type SearchType = WithoutPageConfig<GetEquipmentListRequest>;
const initialFormData: SearchType = {
  name: '',
  person: '',
};

function Equipment() {
  const {
    loadData,
    handleReset,
    loading,
    total,
    handlePageConfigChange,
    page,
    pageSize,
    dataList,
    formData,
    handleFormItemChange,
  } = useDataList<SearchType, EquipmentData>(initialFormData, getEquipmentList);

  const columns: TableProps<EquipmentData>['columns'] = [
    {
      title: 'No.',
      key: 'index',
      render(_value, _record, index) {
        return index + 1;
      },
    },
    {
      title: '设备名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '设备编号',
      key: 'no',
      dataIndex: 'no',
    },
    {
      title: '负责人',
      key: 'person',
      dataIndex: 'person',
    },
    {
      title: '负责人电话',
      key: 'tel',
      dataIndex: 'tel',
    },
    {
      title: '理论寿命',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '剩余寿命',
      key: 'rest',
      dataIndex: 'rest',
    },
    {
      title: '使用状态',
      key: 'status',
      dataIndex: 'status',
      render(value) {
        if (value == 1) {
          return <Tag color="green">使用中</Tag>;
        } else if (value == 2) {
          return <Tag color="yellow">维护中</Tag>;
        } else if (value == 3) {
          return <Tag color="red">已损坏</Tag>;
        }
      },
    },
    {
      title: '最近保养日期',
      key: 'last',
      dataIndex: 'last',
    },
    {
      title: '规格型号',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '生产厂家',
      key: 'from',
      dataIndex: 'from',
    },
    {
      title: '操作',
      key: 'operate',
      render() {
        return (
          <Button type="primary" size="small">
            详细
          </Button>
        );
      },
    },
  ];

  return (
    <div className="equipment">
      <Card className="search">
        <Row gutter={16}>
          <Col span={10}>
            <p>设备名称:</p>
            <Input
              name="name"
              value={formData.name}
              placeholder="请输入设备名称或编号"
              onChange={handleFormItemChange}
            />
          </Col>
          <Col span={10}>
            <p>负责人:</p>
            <Input
              name="person"
              value={formData.person}
              placeholder="请输入负责人姓名"
              onChange={handleFormItemChange}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" className="mr" onClick={() => loadData()}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt clearfix">
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataList}
          pagination={false}
          rowKey={record => record.id}
        />
        <Pagination
          className="fr mt mb"
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共 ${total} 条`}
          onChange={handlePageConfigChange}
          current={page}
          pageSize={pageSize}
        />
      </Card>
    </div>
  );
}

export default Equipment;
