import {
  DollarOutlined,
  LaptopOutlined,
  RadarChartOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { Card, Col, Progress, Row, Statistic, Timeline } from 'antd';
import type { EChartsOption } from 'echarts-for-react';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { getEnergyData } from '../../api/dashboard';
import { items, option, option2, option3 } from './echartsData';
import './index.scss';

function Dashboard() {
  const initialEnergyOption: EChartsOption = option;
  const [energyOption, setEnergyOption] = useState<EChartsOption>(initialEnergyOption);
  useEffect(() => {
    getEnergyData().then(res => {
      if (res.data) {
        const updateEnergyOption = {
          ...energyOption,
          legend: {
            ...energyOption.legend,
            data: res.data.map(item => item.name),
          },
          series: res.data.map(item => ({
            ...item,
            type: 'line',
            stack: 'Total',
          })),
        };
        setEnergyOption(updateEnergyOption);
      }
    });
  }, []);
  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>13479</h2>
              <p>园区总面积（平方米）</p>
            </div>
            <div className="fr">
              <RadarChartOutlined className="icon" />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>8635</h2>
              <p>总租赁面积（平方米）</p>
            </div>
            <div className="fr">
              <SnippetsOutlined className="icon" style={{ color: '#81c452' }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>38764</h2>
              <p>园区总产值（万元）</p>
            </div>
            <div className="fr">
              <DollarOutlined className="icon" style={{ color: '#62c9cb' }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>2874</h2>
              <p>入住企业总数（家）</p>
            </div>
            <div className="fr">
              <LaptopOutlined className="icon" style={{ color: '#e49362' }} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt">
        <Col span={12}>
          <Card title="能源消耗情况">
            <ReactECharts option={energyOption} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="企业资质情况">
            <ReactECharts option={option2} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt">
        <Col span={12}>
          <Card title="租赁情况">
            <ReactECharts option={option3} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="充电桩空闲统计">
            <div className="wrap text-center">
              <Progress type="circle" percent={75} className="mt" />
              <Statistic title="总充电桩数" value={75} suffix="/ 100" />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="实时车辆信息">
            <div className="wrap">
              <Timeline items={items} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
