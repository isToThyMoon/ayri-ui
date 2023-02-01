---
category: Components
title: Cascader级联选择
subtitle: 级联选择
order: 6
group:
  title: Data Entry数据录入
  order: 6
demo:
  cols: 2
---

代办：
搜索按钮默认替换
clear 图标替换

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户『你在哪里』时；
- 当需要向上导航的功能时。

## 代码演示

大小

```jsx
import React from 'react';
import { Cascader, Space } from 'future-ui';
import 'future-ui/es/cascader/style/index.scss';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  const regions = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
    {
      value: 'hangzhou',
      label: 'Hangzhou',
      parent: 'zhejiang',
    },
    {
      value: 'xihu',
      label: 'West Lake',
      parent: 'hangzhou',
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
    },
    {
      value: 'nanjing',
      label: 'Nanjing',
      parent: 'jiangsu',
    },
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      parent: 'nanjing',
    },
    {
      value: 'chongqing',
      label: 'Chong Qiong',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical">
        <Cascader
          className="demo-cascader"
          options={regions}
          // value={selectedRegions}
          placeholder="请选择"
          // onChange={(value) => {setSelectedRegions(value)}}
          expandTrigger="hover"
          changeOnSelect
        />
      </Space>
    </div>
  );
};
```
