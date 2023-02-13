---
category: Components
title: Inputnumber数字输入框
subtitle: 数字输入框
order: 4
group:
  title: Data Entry数据录入
  order: 6
demo:
  cols: 2
---

# Inputnumber 数字输入框

> 在输入框中，输入范围内的数值

## 基础说明

### 组件类型

内嵌式数字输入框（+、-控件默认隐藏，激活后在输入框内显示），外显数字输入框（+、-控件直接显示在输入框左右侧）。

### 组件尺寸

输入框定义了三种尺寸（大、默认、小），高度分别为 40px、31px 和 26px。
大小对应关系: large 对应 1920 middle 对应 1920 /1366 small 对应 1024

### 前置/后置标签( 用于配置一些固定组合)

```jsx
import React from 'react';
import { InputNumber, ManualInputNumber, Input, Space } from 'future-ui';
import 'future-ui/es/input-number/style/index.less';

export default () => {
  return (
    <div>
      <div>
        <Space direction="vertical">
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}></div>
            <div style={{ width: '260px' }}>
              <InputNumber addonBefore="≥" defaultValue={100} />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}></div>
            <div style={{ width: '260px' }}>
              <InputNumber addonAfter="$" defaultValue={100} />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}>隐藏按钮</div>
            <div style={{ width: '260px' }}>
              <InputNumber addonAfter="$" defaultValue={100} controls={false} />
            </div>
          </Space>
          <Space>
            <div style={{ width: '70px', textAlign: 'right' }}></div>
            <div style={{ width: '260px' }}>
              <ManualInputNumber defaultValue={100} />
            </div>
          </Space>
        </Space>
      </div>
    </div>
  );
};
```
