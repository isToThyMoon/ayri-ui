---
category: Components
title: InputNumber数字输入框
subtitle: 数字输入框
order: 5
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
import { InputNumber, Space } from 'future-ui';
import 'future-ui/es/input-number/style/index.less';

const style = {
  background: 'blue',
  color: 'white',
};

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Space direction="vertical">
        <InputNumber min={1} max={10} defaultValue={3} />
      </Space>
    </div>
  );
};
```
