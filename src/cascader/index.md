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

# Cascader 级联选择

> 分页是用于将内容或数据分成多个页面，并具有导航到下一页或上一页，或输入跳转到具体页码的控件

## 基础说明

### 组件类型

基础 多选

### 组件尺寸

三种尺寸（大、默认、小），高度分别为 40px、31px 和 26px。

基础

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
    <div style={{ display: 'flex', width: '200px' }}>
      <Cascader
        className="demo-cascader"
        options={regions}
        // value={selectedRegions}
        placeholder="请选择"
        // onChange={(value) => {setSelectedRegions(value)}}
        expandTrigger="hover"
        changeOnSelect
      />
    </div>
  );
};
```
