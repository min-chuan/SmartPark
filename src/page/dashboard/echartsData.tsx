import { Tag } from 'antd';
import type { TimelineItemType } from 'antd/es/timeline/Timeline';
import type { EChartsOption } from 'echarts-for-react';

export const option: EChartsOption = {
  title: {
    text: '当日能源消耗',
    left: 'left',
    top: 'top',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [],
    top: 'top',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
};

export const option2: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  title: {
    text: '企业资质情况(家)',
    top: 'top',
    left: 'left',
  },
  legend: {
    data: ['科技企业', '高新企业', '国营企业'],
    top: 'top',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    data: ['2014', '2016', '2018', '2020', '2022', '2024'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '科技企业',
      data: [40, 220, 378, 658, 1122, 1200],
      type: 'bar',
    },
    {
      name: '高新企业',
      data: [20, 39, 443, 490, 559, 762],
      type: 'bar',
    },
    {
      name: '国营企业',
      data: [78, 167, 229, 330, 380, 420],
      type: 'bar',
    },
  ],
};

export const option3: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'top',
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: '租赁情况',
      type: 'pie',
      radius: [30, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: '在营' },
        { value: 38, name: '已租' },
        { value: 32, name: '出租' },
        { value: 30, name: '续签' },
        { value: 28, name: '新签' },
        { value: 26, name: '待租' },
        { value: 22, name: '退租' },
      ],
    },
  ],
};

export const items: TimelineItemType[] = [
  {
    color: 'blue',
    content: (
      <div>
        <Tag className="mr" color="green" variant="outlined">
          进场
        </Tag>
        08:24 车辆 京A66666
      </div>
    ),
  },
  {
    color: 'red',
    content: (
      <div>
        <Tag className="mr" color="red" variant="outlined">
          出场
        </Tag>
        09:15 车辆 京A66666
      </div>
    ),
  },
  {
    color: 'blue',
    content: (
      <div>
        <Tag className="mr" color="green" variant="outlined">
          进场
        </Tag>
        09:22 车辆 京A23456
      </div>
    ),
  },
  {
    color: 'red',
    content: (
      <div>
        <Tag className="mr" color="red" variant="outlined">
          出场
        </Tag>
        10:43 车辆 京A18763
      </div>
    ),
  },
  {
    color: 'blue',
    content: (
      <div>
        <Tag className="mr" color="green" variant="outlined">
          进场
        </Tag>
        13:38 车辆 京A888888
      </div>
    ),
  },
  {
    color: 'blue',
    content: (
      <div>
        <Tag className="mr" color="green" variant="outlined">
          进场
        </Tag>
        14:46 车辆 京A675423
      </div>
    ),
  },
];
